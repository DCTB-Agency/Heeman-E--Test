// Bestand groter dan de limiet (data-max-mb): meteen melden in plaats van pas na verzenden.
document.querySelectorAll<HTMLInputElement>('input[type=file][data-max-mb]').forEach((input) => {
  input.addEventListener('change', () => {
    const max = Number(input.dataset.maxMb) * 1024 * 1024;
    const file = input.files?.[0];
    input.setCustomValidity(file && file.size > max ? `Het bestand is te groot (max. ${input.dataset.maxMb} MB).` : '');
    input.reportValidity();
  });
});
