import React ,{ useRef ,useState ,useEffect} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import Cookies from 'js-cookie'

function Home() {
  const [songs, setsongs] = useState([]);
  const [playlistState, setplaylistState] = useState(0);

    const posit={
        right:'50px',
        bottom:'20px'
    }

    let getData  = () => {
      axios.get('/api/song-list')
      .then((response) => {
        setsongs(response.data.allData);
          console.log('A removed deleted!')
      }).catch((error) => {
          console.log(error)
     })
    }
    useEffect(() => {
        getData();
        setUserToken();
    }, []);

    let setUserToken =()=> {
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";  
      var lenString = 100;  
      var randomstring = '';  
      for (var i=0; i<lenString; i++) {  
        var rnum = Math.floor(Math.random() * characters.length);  
        randomstring += characters.substring(rnum, rnum+1);  
      }
      if(Cookies.get('music_usersession')) {  }
      else { Cookies.set('music_usersession', randomstring) ; }
      playListSongCount();
    }
    const [playlistcount, setPlayListCount] = useState([]);
    let playListSongCount = ()=>{
      const userpersonaltoken = Cookies.get('music_usersession');
      fetch('/api/get-playlist/'+userpersonaltoken, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      })
     .then(response => response.json())
     .then(data => setPlayListCount(data.allData));
    }

    let addToPlayList = (e) =>{
      const data = new FormData() 
      data.append('song_id', e)
      data.append('user_token', Cookies.get('music_usersession'))
      data.append('song_type', 0)
      axios.post("/api/addto-playlist", data)
      .then((response) => {
        if (response.data.status === 1) {
          setplaylistState( playlistState + 1 );
          playListSongCount();
          alert(response.data.message)
      }
      else
          {
            alert(response.data.message)
          }
      })
      .catch((error) => {
          console.error(error);
      });
    }
    return (
        <>
<div>
<ReactJkMusicPlayer 
  showMediaSession
  defaultPosition={posit}
  quietUpdate
  clearPriorAudioLists
  audioLists={playlistcount}
/>
</div>


<div>

  {/* ##### Header Area Start ##### */}
  
  <header className="header-area">
    {/* Navbar Area */}
    <div className="oneMusic-main-menu">
      <div className="classy-nav-container breakpoint-off">
        <div className="container">
          {/* Menu */}
          <nav className="classy-navbar justify-content-between" id="oneMusicNav">
            {/* Nav brand */}
            <a href="#" className="nav-brand"><img src="img/core-img/logo.png" alt /></a>
            {/* Navbar Toggler */}
            <div className="classy-navbar-toggler">
              <span className="navbarToggler"><span /><span /><span /></span>
            </div>
            {/* Menu */}
            <div className="classy-menu">
              {/* Close Button */}
              <div className="classycloseIcon">
                <div className="cross-wrap"><span className="top" /><span className="bottom" /></div>
              </div>
              {/* Nav Start */}
              <div className="classynav">
                <ul>
                  <li><a href="#">Home</a></li>
                  
                </ul>
                {/* Login/Register & Cart Button */}
                <div className="login-register-cart-button d-flex align-items-center">
                  {/* Login/Register */}
                  <div className="login-register-btn mr-50">
                    <a href="#" id="loginBtn">Myplay list</a>
                  </div>
                  {/* Cart Button */}
                  <div className="cart-btn">
                    <p><span className="icon-shopping-cart" /> <span className="quantity">{playlistcount.length}</span></p>
                  </div>
                </div>
              </div>
              {/* Nav End */}
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
  {/* ##### Header Area End ##### */}
  {/* ##### Hero Area Start ##### */}
  <section className="hero-area">
    <div className="hero-slides owl-carousel">
      {/* Single Hero Slide */}
      <div className="single-hero-slide d-flex align-items-center justify-content-center">
        {/* Slide Img */}
        <div className="slide-img bg-img" style={{backgroundImage: 'url(img/bg-img/bg-1.jpg)'}} />
        {/* Slide Content */}
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-slides-content text-center">
                <h6 data-animation="fadeInUp" data-delay="100ms">Latest album</h6>
                <h2 data-animation="fadeInUp" data-delay="300ms">Beyond Time <span>Beyond Time</span></h2>
                <a data-animation="fadeInUp" data-delay="500ms" href="#" className="btn oneMusic-btn mt-50">Discover <i className="fa fa-angle-double-right" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Single Hero Slide */}
      <div className="single-hero-slide d-flex align-items-center justify-content-center">
        {/* Slide Img */}
        <div className="slide-img bg-img" style={{backgroundImage: 'url(img/bg-img/bg-2.jpg)'}} />
        {/* Slide Content */}
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-slides-content text-center">
                <h6 data-animation="fadeInUp" data-delay="100ms">Latest album</h6>
                <h2 data-animation="fadeInUp" data-delay="300ms">Colorlib Music <span>Colorlib Music</span></h2>
                <a data-animation="fadeInUp" data-delay="500ms" href="#" className="btn oneMusic-btn mt-50">Discover <i className="fa fa-angle-double-right" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* ##### Hero Area End ##### */}


  {/* ##### Featured Artist Area Start ##### */}
  <section className="featured-artist-area section-padding-100 bg-img bg-overlay bg-fixed" style={{backgroundImage: 'url(img/bg-img/bg-4.jpg)'}}>
    <div className="container">
      <div className="row align-items-end">
        <div className="col-12 col-md-5 col-lg-4">
          <div className="featured-artist-thumb">
            <img src="img/bg-img/fa.jpg" alt />
          </div>
        </div>
        <div className="col-12 col-md-7 col-lg-8">
          <div className="featured-artist-content">
            {/* Section Heading */}
            <div className="section-heading white text-left mb-30">
              <p>See what’s new</p>
              <h2>Buy What’s New</h2>
            </div>
            <p>Nam tristique ex vel magna tincidunt, ut porta nisl finibus. Vivamus eu dolor eu quam varius rutrum. Fusce nec justo id sem aliquam fringilla nec non lacus. Suspendisse eget lobortis nisi, ac cursus odio. Vivamus nibh velit, rutrum at ipsum ac, dignissim iaculis ante. Donec in velit non elit pulvinar pellentesque et non eros.</p>
            <div className="song-play-area">
              <div className="song-name">
                <p>01. Main Hit Song</p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* ##### Featured Artist Area End ##### */}
  {/* ##### Miscellaneous Area Start ##### */}
  <section className="miscellaneous-area section-padding-100-0">
    <div className="container">
      <div className="row">
        {/* ***** Weeks Top ***** */}
      
        {/* ***** New Hits Songs ***** */}
        <div className="col-12 col-lg-12">
          <div className="new-hits-area mb-100">
            <div className="section-heading text-left mb-50 wow fadeInUp" data-wow-delay="50ms">
              <p>See what’s new</p>
              <h2>New Hits</h2>
            </div>
            
            { songs.map((singledata) => (
            <div className="single-new-item d-flex align-items-center justify-content-between wow fadeInUp" data-wow-delay="100ms">
              <div className="first-part d-flex align-items-center">
                <div className="thumbnail">
                  <img src={singledata.cover} alt />
                </div>
                <div className="content-">
                  <h6>{singledata.name}</h6>
                  <p>{singledata.singer}</p>
                </div>
              </div>
              <button onClick={()=>addToPlayList(singledata.id)} class="btn oneMusic-btn mt-30" type="submit">Add to playlist <i class="fa fa-angle-double-right"></i></button>
            </div>
            ))}

            
          </div>
        </div>
        {/* ***** Popular Artists ***** */}
        
      </div>
    </div>
  </section>
  {/* ##### Miscellaneous Area End ##### */}
  {/* ##### Contact Area Start ##### */}
  <section className="contact-area section-padding-100 bg-img bg-overlay bg-fixed has-bg-img" style={{backgroundImage: 'url(img/bg-img/bg-2.jpg)'}}>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="section-heading white wow fadeInUp" data-wow-delay="100ms">
            <p>See what’s new</p>
            <h2>Get In Touch</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {/* Contact Form Area */}
          <div className="contact-form-area">
            <form action="#" method="post">
              <div className="row">
                <div className="col-md-6 col-lg-4">
                  <div className="form-group wow fadeInUp" data-wow-delay="100ms">
                    <input type="text" className="form-control" id="name" placeholder="Name" />
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="form-group wow fadeInUp" data-wow-delay="200ms">
                    <input type="email" className="form-control" id="email" placeholder="E-mail" />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group wow fadeInUp" data-wow-delay="300ms">
                    <input type="text" className="form-control" id="subject" placeholder="Subject" />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group wow fadeInUp" data-wow-delay="400ms">
                    <textarea name="message" className="form-control" id="message" cols={30} rows={10} placeholder="Message" defaultValue={""} />
                  </div>
                </div>
                <div className="col-12 text-center wow fadeInUp" data-wow-delay="500ms">
                  <button className="btn oneMusic-btn mt-30" type="submit">Send <i className="fa fa-angle-double-right" /></button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* ##### Contact Area End ##### */}
  {/* ##### Footer Area Start ##### */}
  <footer className="footer-area">
    <div className="container">
      <div className="row d-flex flex-wrap align-items-center">
        <div className="col-12 col-md-6">
          <a href="#"><img src="img/core-img/logo.png" alt /></a>
          <p className="copywrite-text"><a href="#">{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              Copyright © All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true" /> by </a><a href="https://colorlib.com" target="_blank">Colorlib</a>
            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}</p>
        </div>
        <div className="col-12 col-md-6">
          <div className="footer-nav">
            
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* ##### Footer Area Start ##### */}
</div>


        </>
    );
}

export default Home;

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}
