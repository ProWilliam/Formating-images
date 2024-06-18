from image_processing.module_images.create_larger_gradient import create_larger_gradient_background

def apply_gradient(image, color, gradient_size):
  height, width = image.shape[:2]
  gradient_height, gradient_width = gradient_size
  
  # Make sure the gradient size is larger than the original image
  if gradient_height < height or gradient_width < width:
    raise ValueError(f"The gradient size must be larger than the original image size \nsizes: {height, width} \nsizegradient: {gradient_height, gradient_width} ")
      
  # Create the largest gradient
  gradient = create_larger_gradient_background(image.shape, gradient_size, color)
  
  # Calculate the coordinates to center the image on the gradient.
  start_y = (gradient_height - height) // 2
  start_x = (gradient_width - width) // 2
  
  # Place the original image in the center of the gradient.
  gradient[start_y:start_y + height, start_x:start_x + width] = image
  
  return gradient
