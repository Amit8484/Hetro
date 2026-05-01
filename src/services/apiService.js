import { productsData, serviceRequestsData } from '../data/mockData';

const STORAGE_KEYS = {
  products: 'heterowayProducts',
  serviceRequests: 'heterowayServiceRequests'
};

const DEMO_USERS = {};

const cloneData = (value) => JSON.parse(JSON.stringify(value));
const sanitizeProduct = (product) => {
  const { price: _removedPrice, ...rest } = product || {};
  return rest;
};

const readCollection = (key, fallback) => {
  const raw = localStorage.getItem(key);

  if (!raw) {
    const seeded = cloneData(fallback);
    localStorage.setItem(key, JSON.stringify(seeded));
    return seeded;
  }

  try {
    return JSON.parse(raw);
  } catch {
    const seeded = cloneData(fallback);
    localStorage.setItem(key, JSON.stringify(seeded));
    return seeded;
  }
};

const writeCollection = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getProductsStore = () => readCollection(STORAGE_KEYS.products, productsData).map(sanitizeProduct);
const setProductsStore = (data) => writeCollection(STORAGE_KEYS.products, data.map(sanitizeProduct));

const ensureProductSeedCoverage = () => {
  const currentProducts = getProductsStore();
  const seedIds = new Set(productsData.map((p) => p.id));
  const keptCurrentProducts = currentProducts.filter((p) => seedIds.has(p.id));

  const syncedProducts = productsData.map((seedProduct) => {
    const existingProduct = keptCurrentProducts.find((p) => p.id === seedProduct.id);

    if (!existingProduct) {
      return cloneData(seedProduct);
    }

    const existingImage = String(existingProduct.image || '').trim();
    const hasMissingImage = existingImage === '';
    const hasExternalImage = /^https?:\/\//i.test(existingImage);
    const seedImages = Array.isArray(seedProduct.images) ? seedProduct.images : [];
    const existingImages = Array.isArray(existingProduct.images) ? existingProduct.images : [];
    const hasMissingGallery = seedImages.length > 0 && existingImages.length === 0;
    const hasStaleGallery = seedImages.length > 0 && JSON.stringify(existingImages) !== JSON.stringify(seedImages);
    const hasStaleCover = existingImage !== String(seedProduct.image || '').trim();

    if (hasMissingImage || hasExternalImage || hasMissingGallery || hasStaleGallery || hasStaleCover) {
      return {
        ...existingProduct,
        image: seedProduct.image,
        images: seedProduct.images
      };
    }

    return existingProduct;
  });

  const needsSync =
    syncedProducts.length !== currentProducts.length ||
    syncedProducts.some((product) => {
      const current = currentProducts.find((p) => p.id === product.id);
      return !current || current.image !== product.image;
    });

  if (needsSync) {
    setProductsStore(syncedProducts);
  }

  return syncedProducts;
};

const getRequestsStore = () => readCollection(STORAGE_KEYS.serviceRequests, serviceRequestsData);
const setRequestsStore = (data) => writeCollection(STORAGE_KEYS.serviceRequests, data);

const setSession = (role, user) => {
  localStorage.setItem(`${role}User`, JSON.stringify(user));
};

export const authService = {
  login: async ({ email, password, role }) => {
    const candidate = DEMO_USERS[role];

    if (!candidate || candidate.email !== email || candidate.password !== password) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...safeUser } = candidate;
    const user = cloneData(safeUser);

    setSession(role, user);
    return user;
  }
};

// Product Services
export const productService = {
  getAllProducts: async () => {
    return cloneData(ensureProductSeedCoverage());
  },

  getProductById: async (id) => {
    const product = ensureProductSeedCoverage().find((p) => p.id === Number(id));
    if (!product) {
      throw new Error('Product not found');
    }
    return cloneData(product);
  },

  searchProducts: async (query) => {
    const normalizedQuery = String(query || '').toLowerCase();
    const filtered = ensureProductSeedCoverage().filter((p) =>
      p.name.toLowerCase().includes(normalizedQuery) ||
      p.description.toLowerCase().includes(normalizedQuery)
    );
    return cloneData(filtered);
  },

  filterProducts: async (category, minPrice, maxPrice) => {
    const filtered = ensureProductSeedCoverage().filter((p) => {
      const categoryMatch = !category || p.category === category;
      const minMatch = minPrice === undefined || minPrice === null || minPrice === '';
      const maxMatch = maxPrice === undefined || maxPrice === null || maxPrice === '';
      return categoryMatch && minMatch && maxMatch;
    });

    return cloneData(filtered);
  },

  addProduct: async (productData) => {
    const products = getProductsStore();
    const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

    const newProduct = {
      id: nextId,
      ...productData
    };

    const updatedProducts = [...products, newProduct];
    setProductsStore(updatedProducts);
    return cloneData(newProduct);
  },

  updateProduct: async (id, productData) => {
    const productId = Number(id);
    const products = getProductsStore();
    const index = products.findIndex((p) => p.id === productId);

    if (index === -1) {
      throw new Error('Product not found');
    }

    const updatedProduct = {
      ...products[index],
      ...productData,
      id: products[index].id,
      specifications: {
        ...(products[index].specifications || {}),
        ...(productData.specifications || {})
      }
    };

    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;
    setProductsStore(updatedProducts);

    return cloneData(updatedProduct);
  },

  deleteProduct: async (id) => {
    const productId = Number(id);
    const products = getProductsStore();
    const updatedProducts = products.filter((p) => p.id !== productId);

    if (updatedProducts.length === products.length) {
      throw new Error('Product not found');
    }

    setProductsStore(updatedProducts);
    return { success: true };
  }
};

// Service Requests
export const serviceRequestService = {
  getAllRequests: async () => {
    return cloneData(getRequestsStore());
  },

  getRequestById: async (id) => {
    const requestItem = getRequestsStore().find((r) => r.id === Number(id));
    if (!requestItem) {
      throw new Error('Service request not found');
    }
    return cloneData(requestItem);
  },

  updateRequestStatus: async (id, status) => {
    const requestId = Number(id);
    const requests = getRequestsStore();
    const index = requests.findIndex((r) => r.id === requestId);

    if (index === -1) {
      throw new Error('Service request not found');
    }

    const updatedRequest = {
      ...requests[index],
      status
    };

    const updatedRequests = [...requests];
    updatedRequests[index] = updatedRequest;
    setRequestsStore(updatedRequests);

    return cloneData(updatedRequest);
  }
};
