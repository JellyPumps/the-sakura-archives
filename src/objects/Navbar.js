document.addEventListener('DOMContentLoaded', function () {
    const navbar = `
      <nav id="navbar">
        <div id="logo">
          <img src="./logo.png" alt="The Sakura Archives">
        </div>
        <a id="link_btn" href="/">Home</a>
        <a id="link_btn" href="/contact_us.html">Contact Us</a>
        <a id="link_btn" href="/guestbook.html">Guestbook</a>
      </nav>
    `;
  
    document.body.insertAdjacentHTML('afterbegin', navbar);
});