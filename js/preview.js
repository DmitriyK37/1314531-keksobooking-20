'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var imageChooser = document.querySelector('#images');
  var imagePreviewContainer = document.querySelector('.ad-form__photo');

  avatarChooser.addEventListener('change', function () {
    removeAvatar();
    var avatar = avatarChooser.files[0];
    var avatarName = avatar.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return avatarName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(avatar);
    }
  });

  imageChooser.addEventListener('change', function () {
    removeImage();
    var image = imageChooser.files[0];
    var imageName = image.name.toLowerCase();
    var imagePreview = document.createElement('img');
    imagePreview.style.width = '100%';
    imagePreview.style.height = '100%';
    imagePreview.style.alt = 'Фотография жилья';
    imagePreviewContainer.appendChild(imagePreview);
    var matches = FILE_TYPES.some(function (item) {
      return imageName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imagePreview.src = reader.result;
      });
      reader.readAsDataURL(image);
    }
  });

  var removeImage = function () {
    var previewRemove = imagePreviewContainer.querySelector('img');
    if (previewRemove) {
      previewRemove.remove();
    }
  };

  var removeAvatar = function () {
    var previewAvatarRemove = avatarPreview;
    if (previewAvatarRemove.src) {
      previewAvatarRemove.src = 'img/muffin-grey.svg';
    }
  };

  window.preview = {
    removeImage: removeImage,
    removeAvatar: removeAvatar
  };
})();
