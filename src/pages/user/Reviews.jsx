import { ExternalLink, Star } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const reviewVideos = [
  {
    videoId: '8V1k2vr-IYU',
    url: 'https://youtu.be/8V1k2vr-IYU'
  },
  {
    videoId: 'LoI_PF8JNr4',
    url: 'https://youtu.be/LoI_PF8JNr4'
  },
  {
    videoId: 'kMiYR2GHs_o',
    url: 'https://youtu.be/kMiYR2GHs_o'
  },
  {
    videoId: '3JCE63t0vHY',
    url: 'https://youtu.be/3JCE63t0vHY'
  },
  {
    videoId: '1r0G01suvt0',
    url: 'https://youtu.be/1r0G01suvt0'
  },
  {
    videoId: 'yY9x1LNCLwo',
    url: 'https://youtu.be/yY9x1LNCLwo'
  },
  {
    videoId: 'f88mWnMKOJc',
    url: 'https://youtu.be/f88mWnMKOJc'
  },
  {
    videoId: 'S8L4qnLuFHs',
    url: 'https://youtu.be/S8L4qnLuFHs'
  },
  {
    videoId: 'cy6EkOs_IO0',
    url: 'https://youtu.be/cy6EkOs_IO0'
  },
  {
    videoId: 'fH9dQeVs07U',
    url: 'https://youtu.be/fH9dQeVs07U'
  },
  {
    videoId: 'cC_nOzu4rmI',
    url: 'https://youtu.be/cC_nOzu4rmI'
  },
  {
    videoId: '8W5Wnc3U25k',
    url: 'https://youtu.be/8W5Wnc3U25k'
  },
  {
    videoId: 'lUnD2vbKEY8',
    url: 'https://youtu.be/lUnD2vbKEY8'
  }
];

export default function Reviews() {
  return (
    <>
      <Navbar userType="user" />

      <section className="bg-gradient-to-r from-lime-800 to-lime-900 text-white py-10">
        <div className="container mx-auto px-4">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-lime-100">
            <Star className="h-4 w-4 fill-current" />
            Customer Reviews
          </p>
          <h1 className="text-4xl font-bold mb-2">Video Reviews</h1>
          <p className="text-lime-100 max-w-2xl">
            Browse video reviews and YouTube links for tractors, implements, and customer feedback.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewVideos.map((video) => (
            <article key={video.videoId} className="rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="p-6">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-red-700"
                >
                  Watch on YouTube <ExternalLink size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
