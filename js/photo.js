
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#images');
const preview = document.querySelector('.ad-form__photo img');
const fileAvatarChooser = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview img');

const setFileChooser = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }

  });
  fileAvatarChooser.addEventListener('change', () => {
    const fileAvatar = fileAvatarChooser.files[0];
    const fileAvatarName = fileAvatar.name.toLowerCase();
    const matchesAvatar = FILE_TYPES.some((it) => fileAvatarName.endsWith(it));
    if (matchesAvatar) {
      const readerAvatar = new FileReader();
      readerAvatar.addEventListener('load', () => {
        previewAvatar.src = readerAvatar.result;
      });
      readerAvatar.readAsDataURL(fileAvatar);
    }
  });
};

export { setFileChooser };
