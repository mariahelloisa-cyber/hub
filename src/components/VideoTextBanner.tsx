import VideoText from "./VideoText";
import videoHero from "@/assets/videohero.mp4";

const VideoTextBanner = () => {
  return (
    <section className="relative overflow-hidden bg-background pb-0 pt-2 md:pt-4">
      <div className="container">
        <div className="mx-auto h-24 w-full max-w-4xl sm:h-32 md:h-48">
          <VideoText
            text="HUB EDU"
            videoSource="upload"
            src={videoHero}
            font={{
              fontFamily: "Fredoka, DM Sans, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(48px, 9vw, 130px)",
              letterSpacing: "-0.02em",
              lineHeight: "1em",
              textAlign: "center",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default VideoTextBanner;
