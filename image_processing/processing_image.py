import cv2 
import numpy as np
from flask import send_file

from image_processing.module_images import get_border_pixel, apply_gradient_to_image

def processing(image_file):
    
  if image_file is None:
    return -1

  imagen_bytes = image_file.read()

  np_array = np.frombuffer(imagen_bytes, np.uint8) # covers bites in array numpy.
  image = cv2.imdecode(np_array, cv2.IMREAD_COLOR) # Decode image.
  
  # Desired color for the gradient (in BGR format).
  color = get_border_pixel.get_border_pixel_color(image)

  # Desired size for the gradient (width x height)
  gradient_size = (image.shape[0] * 2, image.shape[1] * 2) # Double the size of the original image

  # Apply the gradient to the image.
  blended_image = apply_gradient_to_image.apply_gradient(image, color, gradient_size)

  return send_file(blended_image, mimetype='image/jpeg')