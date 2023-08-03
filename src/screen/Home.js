import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Footer from '../components/Footer'

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setsearch] = useState("");

  const loaddata = async () => {
   
    let response = await fetch('https://go-food-backen.onrender.com/api/foodData',
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
    response = await response.json();
    
    setFoodItem(response[0]);
    setFoodCat(response[1]);

  }
  useEffect(() => {
    console.log(localStorage.getItem("authToken"));
    loaddata();
  }, [])
  



  return (
    <div>
      <div> <Navbar /> </div>
      {/*-------------------------------------------------------------------------CAROUSEL------------------------------------------------------------  */}

      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: 10 }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>

            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?Pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?Barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <div className='container'>
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (
                <div>
                  <div key={data._id} className='fs-3 m-3'> {data.CategoryName} </div>
                  <hr />
                  <div className='row'>
                    {
                      foodItem !== [] ?
                        foodItem.filter((item) => item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLowerCase())))
                          .map((filtereditems) => {
                            return (<div key={filtereditems._id} className='col-12 col-md-6 col-lg-3'>
                              <Card
                                fooditem={filtereditems}
                                options={filtereditems.options}>
                              </Card>
                            </div>)

                          })
                        : <div>No Food Item Found!</div>
                    }

                  </div>
                </div>
              )
            }) : ""
        }
      </div>
      <div> <Footer /> </div>
    </div>
  )

}
