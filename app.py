from flask import Flask, request, render_template, jsonify
from image_processing.processing_image import processing

app = Flask(__name__)

@app.route("/")
def hello():
  return render_template('index.html')

@app.route("/formatting_image", methods=['POST'])
def formatting():

  if 'image' not in request.files:
    return jsonify({'message': 'No file uploaded'}), 400
  
  image_file = request.files['image']
  formt_image = processing(image_file)
  
  return formt_image


if __name__ == "__main__":
  app.run(host='0.0.0.0', port=3000, debug=True)