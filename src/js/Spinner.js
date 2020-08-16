export default class Spinner {

  loadingSpinner(isLoading) {
    this.spinner = document.querySelector('.lds-ring');

    if (isLoading) {
      this.spinner.classList.add('lds-ring_visible');
    } else {
      this.spinner.classList.remove('lds-ring_visible');
    }
  }
}
