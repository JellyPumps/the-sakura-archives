document.addEventListener('DOMContentLoaded', function () {
    const navbar = `
      <nav id="navbar">
        <div id="logo">
          <img src="./logo.png" alt="The Sakura Archives">
        </div>
        <div id="search">
          <input type="text" placeholder="Search...">
        </div>
        <a id="home" href="/">Home</a>
      </nav>
    `;
  
    // Inject the navbar at the top of the body
    document.body.insertAdjacentHTML('afterbegin', navbar);
});