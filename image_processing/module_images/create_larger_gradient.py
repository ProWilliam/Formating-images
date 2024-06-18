import numpy as np

def create_larger_gradient_background(image_shape, gradient_size, color):
  height, width = image_shape[:2]
  gradient_height, gradient_width = gradient_size
  
  # Create a black image with gradient size.
  gradient = np.zeros((gradient_height, gradient_width, 3), dtype=np.uint8)
  
  center_x, center_y = gradient_width // 2, gradient_height // 2
  max_dist = np.sqrt(center_x**2 + center_y**2)
  
  for y in range(gradient_height):
    for x in range(gradient_width):
      dist = np.sqrt((x - center_x)**2 + (y - center_y)**2)
      intensity = 1 - (dist / max_dist)
      gradient[y, x] = (color[0] * intensity, color[1] * intensity, color[2] * intensity)
    
  return gradient