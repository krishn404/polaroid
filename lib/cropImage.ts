export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener("load", () => resolve(image))
      image.addEventListener("error", (error) => reject(error))
      image.setAttribute("crossOrigin", "anonymous")
      image.src = url
    })
  
  export const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: { width: number; height: number; x: number; y: number },
    rotation = 0,
  ): Promise<string> => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
  
    if (!ctx) {
      return ""
    }
  
    // Calculate bounding box of the rotated image
    const rotRad = (rotation * Math.PI) / 180
    const boundingBox = {
      width: Math.abs(Math.cos(rotRad) * pixelCrop.width) + Math.abs(Math.sin(rotRad) * pixelCrop.height),
      height: Math.abs(Math.sin(rotRad) * pixelCrop.width) + Math.abs(Math.cos(rotRad) * pixelCrop.height),
    }
  
    // Set canvas size to match the bounding box
    canvas.width = boundingBox.width
    canvas.height = boundingBox.height
  
    // Translate canvas context to center
    ctx.translate(boundingBox.width / 2, boundingBox.height / 2)
  
    // Rotate around the center
    ctx.rotate(rotRad)
  
    // Draw the image at the calculated position
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      -pixelCrop.width / 2,
      -pixelCrop.height / 2,
      pixelCrop.width,
      pixelCrop.height,
    )
  
    return canvas.toDataURL("image/jpeg", 0.95)
  }
  
  