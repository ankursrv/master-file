import CustomImage from "../../customImage"

const ScheduleGallery = ({
  images,
  maxVisible = 3,
  onOpenDialog
}) => {
  const visibleImages = images.slice(0, maxVisible)
  const remaining = images.length - maxVisible
  const handleOverlayClick = () => {
    if (onOpenDialog) {
      onOpenDialog()
    }
  }

  return (
    <div className="gallery">
      {visibleImages.map((img, index) => (
        <div key={index} className="imageBox relative overflow-hidden rounded-xl">
          <CustomImage
            src={img.image}
            width={1000}
            height={1000}
            alt={`schedule-${index + 1}`}
            className="responsive-image-cover"
          />

          {index === maxVisible - 1 && remaining > 0 && (
            <div
              className="overlay cursor-pointer hover:bg-black/70 transition-colors"
              onClick={handleOverlayClick}
            >
              +{remaining}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ScheduleGallery
