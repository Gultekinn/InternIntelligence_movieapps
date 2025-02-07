import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import styles from "./MovieDetail.module.css";
import Image from 'next/image'; // Importing Image from next/image

interface MovieDetail {
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  genres: { id: number; name: string }[];
  runtime: number;
}

interface Video {
  key: string;
  type: string;
  site: string;
  name: string;
}

const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e6199d4a2ef9eb0080b02488fa05e890`)
        .then((response) => response.json())
        .then((data) => setMovie(data));

      fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=e6199d4a2ef9eb0080b02488fa05e890`)
        .then((response) => response.json())
        .then((data) => {
          const validVideos = data.results.filter((video: Video) => video.site === "YouTube");
          setVideos(validVideos);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const openModal = (videoKey: string) => {
    setCurrentVideo(videoKey);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentVideo(null);
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (!movie) {
    return <div className="text-center text-white">Movie not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.heroImage}
          width={500} // Add a fixed width for optimization
          height={750} // Add a fixed height for optimization
        />
        <div className={styles.overlay}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>{movie.title}</h1>
            <p className={styles.releaseDate}>Release Date: {movie.release_date}</p>
            <p className={styles.overview}>{movie.overview}</p>
            <div className={styles.stats}>
              <span>⭐ {movie.vote_average.toFixed(1)}</span>
              <span>Votes: {movie.vote_count}</span>
              <span>Runtime: {movie.runtime} min</span>
            </div>
            <div className={styles.genres}>
              {movie.genres.map((genre) => (
                <span key={genre.id} className={styles.genre}>
                  {genre.name}
                </span>
              ))}
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${videos[0]?.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.trailerButton}
            >
              <Play className={styles.playIcon} />
              Watch Trailer
            </a>
          </div>
        </div>
      </div>

      {/* Videos Section */}
      {videos.length > 0 && (
        <div className={styles.videoSection}>
          <h2 className="text-xl font-bold mb-4">Videos</h2>
          <div className={styles.videoWrapper}>
            {videos.map((video) => (
              <div key={video.key} className={styles.videoItem} onClick={() => openModal(video.key)}>
                <div className={styles.videoThumbnail}>
                  <Image
                    src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                    alt={video.name}
                    className={styles.videoImage}
                    width={500} // Width of the image
                    height={281} // Height of the image (16:9 aspect ratio)
                  />
                  <div className={styles.playButton}>
                    <Play />
                  </div>
                </div>
                <div className={styles.videoInfo}>
                  <h3 className="text-white font-semibold">{video.name}</h3>
                  <p className="text-gray-400 text-sm">Type: {video.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Video */}
      {modalOpen && currentVideo && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <iframe
              className={styles.videoPlayer}
              src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Trailer"
            ></iframe>
            <button onClick={closeModal} className={styles.closeModal}>
            ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
