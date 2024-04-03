import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Typography , Grid } from '@mui/material';
import { getAllCategories } from '../../apiCalls';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link } from 'react-router-dom';


const Category = () => {


  const noimage = 'https://makanmate.com/wp-content/uploads/2022/09/logo.png';

  const [categories , setCategories ] = useState([]);

  console.log(categories , "PPPPPP")

  useEffect(() => {
    const data = {
      OrgId: 3,
    };

    getAllCategories(data)
      .then((data) => {
        if (data.Message === 'Sucess') {
          if(data.Data && data.Data.length){
            setCategories(data.Data);
          }
        } else {
          toast.error(data.Message + ' in Categories');
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [categories]);


  const handleCategoryClick  = (category) => {
    window.location(`/Home/${category}/all`)
}

  return (
    <>
          <div class="accordion" id="accordionExample">
              {categories && categories.length > 0 && categories.map((item, index) => (
                <div class={`accordion-item ${!item.SubCategoryDetail || item.SubCategoryDetail.length === 0 ? '' : 'no-subcategories'}`} key={index}>
                  <h2 class="accordion-header p-0" id={`heading${index}`}>
                  {/* <Link to={`/Home/${item.category.Categoryshorturl}/all/list`} style={{ textDecoration: 'none', color: 'black' }}> */}
                    <Link to={`/`} style={{ textDecoration: 'none', color: 'black' }}>
                      <button class="accordion-button collapsed pt-1 pb-1 pl-2 pr-2 " 
                        type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                        <Grid container direction='row'>
                          <Grid item md={4}>
                            <img src={item.IconImageFilePath || noimage} alt="e" width='60' height='60' />
                          </Grid>
                          <Grid className="cta-names" item md={8} sx={{ display: 'flex', alignItems: 'center' }} onclick={(e) => {handleCategoryClick(item.Categoryshorturl)}}>
                              <Typography className="catName">{item.Name}</Typography>
                          </Grid>
                        </Grid>
                      </button>
                    </Link>
                  </h2>
                  {item.SubCategoryDetail && item.SubCategoryDetail.length > 0 && (
                    <div id={`collapse${index}`} class="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <div class="accordion" id="subaccordionExample">
                          {item.SubCategoryDetail.map((subcategory, subIndex) => (
                            <div class={`accordion-item ${!subcategory.SubCategoriesLevel2Detail || subcategory.SubCategoriesLevel2Detail.length === 0 ? '' : 'no-subcategories'}`} key={subcategory.Code}>
                              <h2 class="accordion-header p-0" id={`subheading${subIndex}`}>
                                {/* <Link to={`/Home/${item.category.Categoryshorturl}/${subcategory.Subcatgeoryshorturl}/list`} style={{ textDecoration: 'none', color: 'black' }}> */}
                                <Link to={`/rt`} style={{ textDecoration: 'none', color: 'black' }}>
                                  <button class="accordion-button collapsed pt-1 pb-1 pl-2 pr-2" type="button" data-bs-toggle="collapse" data-bs-target={`#subcollapse${subcategory.Code}`} aria-expanded="false" aria-controls={`subcollapse${subIndex}`}>
                                    <Grid container direction='row'>
                                      <Grid item md={3}>
                                        <img src={subcategory.IconImageFilePath || noimage} alt="logo" width='50' height='50' />
                                      </Grid>
                                      <Grid item md={9} sx={{ display: 'flex', alignItems: 'center' }}>
                                          {subcategory.Name}
                                      </Grid>
                                    </Grid>
                                  </button>
                                </Link>
                              </h2>
                              {subcategory.SubCategoriesLevel2Detail && subcategory.SubCategoriesLevel2Detail.length > 0 && (
                                <div id={`subcollapse${subcategory.Code}`} class="accordion-collapse collapse" aria-labelledby={`subheading${subcategory.Code}`} data-bs-parent="#subaccordionExample">
                                  <div class="accordion-body">
                                    <ul style={{ listStyleType: 'none', margin: '0' }}>
                                    {subcategory.SubCategoriesLevel2Detail.map((level2, l3Index) => (
                                    // <Link to={`/Home/${item.category.Categoryshorturl}/${subcategory.Subcatgeoryshorturl}/${level2.SubCatgeoryL2shorturl}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    <Link to={`/`} style={{ textDecoration: 'none', color: 'black' }}>
                                      <Grid container direction='row' sx={{cursor:'pointer'}}>
                                        <Grid item md={3}>
                                          <img src={level2.SubL2IconImageFilePath || noimage} alt="logo" width='50' height='50' />
                                        </Grid>
                                        <Grid item md={9} sx={{ display: 'flex', alignItems: 'center' }}>
                                            {level2.Name}
                                        </Grid>
                                      </Grid>
                                    </Link>
                                    ))}
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
     </div>
    </>
  );
};

export default Category;
