def get_border_pixel_color(image, position='top-left'):
    height, width = image.shape[:2]
    
    if position == 'top-left':
        pixel = image[0, 0]
    elif position == 'top-right':
        pixel = image[0, width - 1]
    elif position == 'bottom-left':
        pixel = image[height - 1, 0]
    elif position == 'bottom-right':
        pixel = image[height - 1, width - 1]
    elif position == 'left-middle':
        pixel = image[height // 2, 0]
    elif position == 'right-middle':
        pixel = image[height // 2, width - 1]
    elif position == 'top-middle':
        pixel = image[0, width // 2]
    elif position == 'bottom-middle':
        pixel = image[height - 1, width // 2]
    else:
        raise ValueError(f"Posición no válida: {position}")
    
    # Invert color from BGR to RGB
    color = pixel[::-1]  # Switch from BGR to RGB.
    
    return tuple(color)