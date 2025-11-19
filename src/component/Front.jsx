import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Front({empid}) {

    const [data,setdata] = useState({
         firstname:"",
        lastname:"",
        email:"",
        disscus:"",
        comment:"",
    })

    const [user,setuser ] = useState(()=>{
        return localStorage.getItem("token") || null; 
    })
  const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  let navigate = useNavigate()

   useEffect(()=>{
      fetchuser();
    },[empid])
    const fetchuser = async () => {  
        try {
          const res = await fetch(
            `http://localhost:5000/api/auth/getuser/${empid}`,
            {
              method: "GET",
              headers: {
                "auth-token": localStorage.getItem("token"),
              },
            }
          );
          const json = await res.json();
          setdata(json || {});
        } catch (error) {
          console.log(error);
        }
      };

    const HandleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/contact/addcontact",{
                method:"POST",
                 headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body:JSON.stringify(data)
            })
            const json = await res.json()
            setdata( {
                 firstname:"",
        lastname:"",
        email:"",
        disscus:"",
        comment:"",
            })
            alert("Submitted")
        } catch (error) {
            console.log(error);
            
        }
    }


    const HandleChange = (e) =>{
        setdata({...data,[e.target.name]:e.target.value})
    }

    const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div class="home-2">
      <header class="header-area">
        <div id="header-sticky" class="menu-area menu-area2">
          <div class="container">
            <div class="second-menu">
              <div class="row align-items-center">
                <div class="col-xl-2 col-lg-2">
                  <div class="logo2">
                    <a href="index.html">
                      <img src="img/logo/w_logo.png" alt="logo" />
                    </a>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6">
                  <div class="main-menu text-right pr-15">
                    <nav id="mobile-menu">
                      <ul>
                        <li class="has-sub">
                          <a href="/">Home</a>
                        </li>
                        <li>
                          <a href="#about">About Us</a>
                        </li>
                        <li class="has-sub">
                          <a href="#services">Services</a>
                        </li>

                        <li class="has-sub">
                          <a href="#blog">Blog</a>
                        </li>
                        <li class="has-sub">
                          <a href="#contact">Contact</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-4 d-none d-lg-block">
                  <div class="right-menu">
                    <ul>

                      {user ? (
                          <>
                      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                      <img
                                        src={`http://localhost:5000/upload/${data.image}`}
                                        alt="user"
                                        width="35"
                                        height="35"
                                        style={{ borderRadius: "50%" }}
                                        />
                                    </IconButton>
                                    <Menu
                                      sx={{ mt: "45px" }}
                                      anchorEl={anchorElUser}
                                      open={Boolean(anchorElUser)}
                                      onClose={handleCloseUserMenu}
                                      >
                                        <MenuItem>
                                          <Typography textAlign="center" ><Link to="/dashboard">Go Dashborad</Link></Typography>
                                        </MenuItem>
                                        <MenuItem>
                                          <Typography textAlign="center" onClick={logout}>Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                        </div>
                                            </>
                      ):(
                      <li>
                        <a href="/login" class="top-btn">
                         Login 
                        </a>
                      </li>

                      )}
                    </ul>
                  </div>
                </div>
                <div class="col-12">
                  <div class="mobile-menu"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section id="parallax2" class="slider-area fix p-relative">
          <div class="slider-shape ss-two layer" data-depth="0.30">
            <div class="per-text">
              <h2>
                We Build<span>Champions</span>
              </h2>
            </div>
          </div>

          <div class="slider-shape ss-six layer" data-depth="0.15">
            <img src="img/bg/heade-object.png" alt="shape" />
          </div>
          <div class="slider-shape ss-eight layer" data-depth="0.50">
            <img src="https://htmldemo.zcubethemes.com/hitup/img/bg/header-img.png" alt="shape" />
          </div>
          <div class="slider-active2">
            <div
              class="single-slider slider-bg d-flex align-items-center"
              style={{
    backgroundImage: "url('img/bg/header-bg.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    backgroundSize: "inherit",
  }}
            >
              <div class="container">
                <div class="row align-items-center">
                  <div class="col-lg-7">
                    <div class="slider-content s-slider-content text-left">
                      <h2 data-animation="fadeInUp" data-delay=".4s">
                        Perfect Workout Coach For <span>Body Shape</span>
                      </h2>
                      <p data-animation="fadeInUp" data-delay=".6s">
                        Quisque leo augue, lobortis ac tellus nec, posuere
                        ultricies nulla. Praesent massa odio, pellentesque in
                        consectetur quis, volutpat sit amet erat.
                      </p>
                      <div class="slider-btn mt-25">
                        <a
                          href="#"
                          class="btn ss-btn"
                          data-animation="fadeInRight"
                          data-delay=".8s"
                        >
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-5"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="about"
          class="about-area about-p mt-80 pt-120 pb-120 p-relative"
        >
          <div class="parolx-text-right">About Us</div>
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6 col-md-12 col-sm-12">
                <div class="s-about-img p-relative">
                  <img src="https://htmldemo.zcubethemes.com/hitup/img/bg/about-img.png" alt="img" />
                </div>
              </div>
              <div class="col-lg-6 col-md-12 col-sm-12">
                <div class="about-content s-about-content pl-30">
                  <div class="section-title mb-50">
                    <h2>Let Us Find The Perfect Workout For You !</h2>{" "}
                    <img src="img/bg/circle-line.png" alt="circle" />
                  </div>
                  <p>
                    Fusce orci ligula, tincidunt ut metus vel, venenatis aliquet
                    tortor. Duis et consequat enim. Curabitur pulvinar, dolor at
                    pulvinar molestie, augue massa volutpat felis, at rhoncus
                    tortor velit vel diam. Cras ac suscipit metus.
                  </p>
                  <p>
                    Etiam fermentum ex orci, a ullamcorper erat tempor in. Nulla
                    est ante, ullamcorper vitae dui vel, molestie feugiat
                    sapien.
                  </p>
                  <p>
                    Integer auctor est nec semper hendrerit. Etiam sollicitudin
                    enim in urna commodo, in dapibus velit elementum. Ut congue
                    nisl sapien, vel ultricies nulla tincidunt vitae. Maecenas
                    non ligula quis massa consequat commodo eleifend ut velit.
                    Vestibulum molestie nunc non libero posuere, quis
                    pellentesque massa tempus.
                  </p>
                  <div class="slider-btn mt-15">
                    <a
                      href="#"
                      class="btn ss-btn"
                      data-animation="fadeInRight"
                      data-delay=".8s"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="services"
          class="services-area services-bg pt-120 pb-120 p-relative"
          style={{background: "#24283e"}}
        >
          <div class="parolx-text-left">Our Services</div>
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6 col-md-12 col-sm-12">
                <div class="about-content s-about-content pl-30">
                  <div class="section-title mb-50">
                    <h2>Build Your Body Transform Your Life</h2>
                    <img src="img/bg/circle-line.png" alt="circle" />
                  </div>
                  <p>
                    Integer auctor est nec semper hendrerit. Etiam sollicitudin
                    enim in urna commodo, in dapibus velit elementum. Ut congue
                    nisl sapien, vel ultricies nulla tincidunt vitae. Maecenas
                    non ligula quis massa consequat commodo eleifend ut velit.
                  </p>
                  <p>
                    Aenean eleifend est eget eros molestie pretium. Curabitur
                    varius velit in est elementum consectetur. Mauris in risus
                    bibendum, laoreet ex at, lobortis risus. Nullam id massa
                    eget ante finibus iaculis. Duis eget nisl ipsum. Vivamus
                    ipsum urna, tristique vel arcu nec, elementum congue est.
                    Nullam vitae aliquet turpis.
                  </p>
                </div>
              </div>
              <div class="col-lg-6 col-md-12 col-sm-12">
                <div class="row">
                  <div class="col-lg-6 col-md-6">
                    <div class="s-single-services text-center active">
                      <div class="services-icon">
                        <img src="img/bg/s-icon1.png" alt="img" />
                      </div>
                      <div class="second-services-content">
                        <h5>
                          <a >Yoga</a>
                        </h5>
                        <p>
                          Nam pellentesque, velit at sodales elementum, neque
                          metus ultricies justo, eget varius diam justo ac ante.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="s-single-services text-center">
                      <div class="services-icon">
                        <img src="img/bg/s-icon2.png" alt="img" />
                      </div>
                      <div class="second-services-content">
                        <h5>
                          <a >Cadio </a>
                        </h5>
                        <p>
                          Nam pellentesque, velit at sodales elementum, neque
                          metus ultricies justo, eget varius diam justo ac ante.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="s-single-services text-center">
                      <div class="services-icon">
                        <img src="img/bg/s-icon3.png" alt="img" />
                      </div>
                      <div class="second-services-content">
                        <h5>
                          <a>Fitness</a>
                        </h5>
                        <p>
                          Nam pellentesque, velit at sodales elementum, neque
                          metus ultricies justo, eget varius diam justo ac ante.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="s-single-services text-center">
                      <div class="services-icon">
                        <img src="img/bg/s-icon4.png" alt="img" />
                      </div>
                      <div class="second-services-content">
                        <h5>
                          <a>Health</a>
                        </h5>
                        <p>
                          Nam pellentesque, velit at sodales elementum, neque
                          metus ultricies justo, eget varius diam justo ac ante.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section id="blog" class="blog-area  p-relative pt-100 pb-90 fix">
          <div class="parolx-text-right">Our Blog</div>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-xl-8 col-lg-10">
                <div class="section-title text-center mb-80">
                  <h2>What Our Client Say’s</h2>
                  <img src="img/bg/circle-line.png" alt="circle" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-4 col-md-12">
                <div class="single-post single-post-box mb-30">
                  <div class="blog-thumb">
                    <a href="blog-details.html">
                      <img src="https://images.ctfassets.net/7ajcefednbt4/5FV8LXkcdY3EwzKzfee1gv/2dd2118b083e4a8a928c3edcef379c98/Strava_Brand_Photography_NYC-TeamWRK-Run_3-Year_041624-44.jpg?fm=webp" alt="img" />
                    </a>
                    <div class="ct-link">
                      <a href="#">FITNESS</a>
                    </div>
                  </div>
                  <div class="blog-content">
                    <div class="b-meta mb-20">
                      <div class="row">
                        <div class="col-lg-6 col-md-6">
                          <i class="far fa-calendar-alt"></i> 7 March, 2019
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <i class="fas fa-user"></i> By Jhone Doe
                        </div>
                      </div>
                    </div>
                    <h4>
                      <a href="blog-details.html">
                        Praesent justo mauris, tincidunt vitae nisi ultricies.
                      </a>
                    </h4>
                    <p>
                      Integer auctor est nec semper hendrerit. Etiam
                      sollicitudin enim in urna commodo, in dapibus velit
                      elementum.
                    </p>
                    <div class="blog-btn">
                      <a href="#">
                        Read More<i class="fas fa-chevron-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-12">
                <div class="single-post single-post-box active mb-30">
                  <div class="blog-thumb">
                    <a href="blog-details.html">
                      <img src="https://images.ctfassets.net/7ajcefednbt4/2erzx20IAQM06dIuvCw23I/a545a04de7aa5500e9ddc1b15558808d/Indoor_bike_trainer___TORWAISTUDIO.jpg?fm=webp" alt="img" />
                    </a>
                    <div class="ct-link">
                      <a href="#">FITNESS</a>
                    </div>
                  </div>
                  <div class="blog-content">
                    <div class="b-meta mb-20">
                      <div class="row">
                        <div class="col-lg-6 col-md-6">
                          <i class="far fa-calendar-alt"></i> 7 March, 2019
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <i class="fas fa-user"></i> By Jhone Doe
                        </div>
                      </div>
                    </div>
                    <h4>
                      <a href="blog-details.html">
                        Monthly eraesent justo mauris, vitae nisi ultricies.
                      </a>
                    </h4>
                    <p>
                      Integer auctor est nec semper hendrerit. Etiam
                      sollicitudin enim in urna commodo, in dapibus velit
                      elementum.
                    </p>
                    <div class="blog-btn">
                      <a href="#">
                        Read More<i class="fas fa-chevron-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-12">
                <div class="single-post single-post-box mb-30">
                  {" "}
                  <div class="blog-thumb">
                    <a href="blog-details.html">
                      <img src="https://images.ctfassets.net/7ajcefednbt4/1kon9NqSVfIRzeMFpJqDxH/e75b093bc7b928d323b7a60388858fa7/Runners_in_NYC___Polin_Petkova.jpg?fm=webp" alt="img" />
                    </a>
                    <div class="ct-link">
                      <a href="#">FITNESS</a>
                    </div>
                  </div>
                  <div class="blog-content">
                    <div class="b-meta mb-20">
                      <div class="row">
                        <div class="col-lg-6 col-md-6">
                          <i class="far fa-calendar-alt"></i> 7 March, 2019
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <i class="fas fa-user"></i> By Jhone Doe
                        </div>
                      </div>
                    </div>
                    <h4>
                      <a href="blog-details.html">
                        User Experience Psychology And Performance Smashing
                      </a>
                    </h4>
                    <p>
                      Integer auctor est nec semper hendrerit. Etiam
                      sollicitudin enim in urna commodo, in dapibus velit
                      elementum.
                    </p>
                    <div class="blog-btn">
                      <a href="#">
                        Read More<i class="fas fa-chevron-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" class="contact-area contact-bg pt-100 pb-70 p-relative fix" style={{backgroundImage:`url("img/an-bg/an-bg11.png")`, backgroundSize: "cover",backgroundRepeat: "no-repeat"}}>
                <div class="container">
             
					<div class="row">
                       
						<div class="col-lg-6">
                        <div class="section-title mb-60" >
                                <h2>Get In Touch With Us</h2>
                            </div>
						<form action="#" class="contact-form" >
							<div class="row">
                            <div class="col-lg-6">
                                <div class="contact-field p-relative c-name mb-20">                                    
                                    <input type="text" placeholder="First Name" name="firstname" id="firstname" value={data.firstname} onChange={HandleChange} />
                                </div>                               
                            </div>
                                <div class="col-lg-6">
                                <div class="contact-field p-relative c-name mb-20">                                    
                                    <input type="text" placeholder="Last Name" name="lastname" id="lastname" value={data.lastname} onChange={HandleChange}/>
                                </div>                               
                            </div>
							<div class="col-lg-12">                               
                                <div class="contact-field p-relative c-email mb-20">                                    
                                    <input type="text" placeholder="Write here your email"  name="email" id="email" value={data.email} onChange={HandleChange}/>
                                </div>                                
                            </div>
							<div class="col-lg-12">                               
                                <div class="contact-field p-relative c-subject mb-20">                                   
                                    <input type="text" placeholder="I would like to discuss" name="disscus" id="disscus" value={data.disscus} onChange={HandleChange}/>
                                </div>
                            </div>							
                            <div class="col-lg-12">
                                <div class="contact-field p-relative c-message mb-45">                                  
                                    <textarea cols="30" rows="10" placeholder="Write comments" name="comment" id="comment" value={data.comment} onChange={HandleChange}></textarea>
                                </div>
                                <div class="slider-btn">                                          
                                            <a class="btn ss-btn" data-animation="fadeInRight" data-delay=".8s" onClick={HandleSubmit}>Send Message</a>					
                                        </div>                             
                            </div>
                            </div>
                        
                    </form>
						</div>
                         <div class="col-lg-6">
                          <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m8!1m3!1d12419.091828830478!2d-77.035419!3d38.906307!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d38.9071923!2d-77.0368707!5e0!3m2!1sen!2sus!4v1599600143788!5m2!1sen!2sus" width="100%" height="450" frameborder="0" style={{border:0,height: "500px"}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                        </div>
					</div>
                    
                </div>
               
            </section>
      </main>
      <footer class="footer-bg footer-p pt-90">
        <div class="footer-top-heiding">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-8">
                <div class="section-title">
                  <h2> Subscribe To Our Newsletter For Latest Updates</h2>
                </div>
              </div>
              <div class="col-xl-4 col-lg-4">
                <div class="newslater-area">
                  <form
                    name="ajax-form"
                    id="contact-form4"
                    action="#"
                    method="post"
                    class="contact-form newslater"
                  >
                    <div class="form-group">
                      <input
                        class="form-control"
                        id="email2"
                        name="email"
                        type="email"
                        placeholder="Email Address..."
                        value=""
                        required=""
                      />
                      <button type="submit" class="btn btn-custom" id="send2">
                        Subscribe <i class="fas fa-chevron-right"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-top pb-50">
          <div class="container">
            <div class="row justify-content-between">
              <div class="col-xl-3 col-lg-3 col-sm-6">
                <div class="footer-widget mb-30">
                  <div class="flog mb-35">
                    <a href="#">
                      <img src="img/logo/w_logo.png" alt="logo" />
                    </a>
                  </div>
                  <div class="f-contact">
                    <ul>
                      <li>
                        <i class="icon far fa-clock"></i>
                        <span>
                          111-222-3333
                          <br />
                          +91 555 444-5555
                        </span>
                      </li>
                      <li>
                        <i class="icon dripicons-mail"></i>
                        <span>
                          <a href="mailto:info@example.com">info@example.com</a>
                          <br />
                          <a href="mailto:sale@example.com">sale@example.com</a>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-xl-2 col-lg-2 col-sm-6">
                <div class="footer-widget mb-30">
                  <div class="f-widget-title">
                    <h5>Other Links</h5>
                  </div>
                  <div class="footer-link">
                    <ul>
                      <li>
                        <a href="/">
                          <i class="fas fa-chevron-right"></i> Home
                        </a>
                      </li>
                      <li>
                        <a href="/#about">
                          <i class="fas fa-chevron-right"></i> About Us
                        </a>
                      </li>
                      <li>
                        <a href="/#services">
                          <i class="fas fa-chevron-right"></i> Services
                        </a>
                      </li>
                      <li>
                        <a href="/#blog">
                          <i class="fas fa-chevron-right"></i> Latest Blog
                        </a>
                      </li>
                      <li>
                        <a href="/#contact">
                          <i class="fas fa-chevron-right"></i> Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-xl-5 col-lg-5 col-sm-6">
                <div class="footer-widget mb-30">
                  <div class="footer-text mb-20">
                    <p>
                      Fusce orci ligula, tincidunt ut metus vel, venenatis
                      aliquet tortor. Duis et consequat enim. Curabitur
                      pulvinar, dolor at pulvinar molestie, augue massa volutpat
                      felis, at rhoncus tortor velit vel diam. Cras ac suscipit
                      metus. Cras vitae quam eget risus efficitur malesuada.
                      Praesent condimentum lacus nisi, eu venenatis purus
                      eleifend sit amet. Vivamus ac enim vitae erat scelerisque
                      ullamcorper. Ut id pretium sem. Proin ac consectetur orci.
                    </p>
                  </div>
                  <div class="footer-social">
                    <a href="#">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#">
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i class="fab fa-google-plus-g"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="copyright-wrap">
          <div class="container">
            <div class="row align-items-center text-center">
              <div class="col-12">&copy; 2025 Hitup All Right Reserved.</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Front;
