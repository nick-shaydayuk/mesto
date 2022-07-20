function insertName(profileName) {
  inputProfileName.value = profileName.textContent;
}

function insertText(profileText) {
  inputProfileText.value = profileText.textContent;
}

function editName(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileText.textContent = inputProfileText.value;
  closePopup(popupProfile);
}

profileEditButton.addEventListener("click", function () {
  insertName(profileName);
  insertText(profileText);
  openPopup(popupProfile);
});

popupProfileButtonClose.addEventListener("click", function () {
  closePopup(popupProfile);
});

popupProfileSubmitButton.addEventListener('click', function (evt) {
  editName(evt)
})
