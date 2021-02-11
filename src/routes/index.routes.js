const { Router } = require('express')
const fs = require('fs/promises')
const cloudinary = require('../config/cloudinary')
const Photo = require('../models/Photo')
const router = Router()

//importing all routes here
router.get('/', async (req, res) => {
  const photos = await Photo.find().lean()
  console.log(photos)
  res.render('gallery', { photos })
})

router.get('/images/add', async (req, res) => {
  const photos = await Photo.find().lean()
  console.log(photos)
  res.render('image_form', { photos })
})

router.post('/images/add', async function (req, res) {
  console.group('New Upload Image')
  console.log(req.file)
  console.log(req.body)

  const { title, description } = req.body

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file?.path, {
      folder: 'nodegallery',
    })
    console.log(result)
    const newPhoto = new Photo({
      title,
      description,
      imageURL: result.url,
      public_id: result.public_id,
    })
    await newPhoto.save()
    await fs.unlink(req.file.path)
  }
  console.groupEnd()

  res.redirect('/images/add')
})

router.get('/images/delete/:id_photo', async (req, res) => {
  const id_photo = req.params.id_photo
  console.log(id_photo)
  const photo = await Photo.findByIdAndDelete(id_photo)
  const result = await cloudinary.uploader.destroy(photo.public_id)
  console.log('Image deleted')
  console.log(result)
  res.redirect('/images/add')
})

module.exports = router
