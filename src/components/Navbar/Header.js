import React, {useState, useEffect} from 'react';
import { Grid, Typography, TextField, Button, Box, MenuItem, Select, FormControl ,Autocomplete, AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem } from '@mui/material';
  import MenuIcon from '@mui/icons-material/Menu';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import SearchIcon from '@mui/icons-material/Search';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import CloseIcon from '@mui/icons-material/Close';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import logo from '../../logo.jpeg';
import { top20 } from '../../config';

import { getBusinessCategoriesData ,getBusinessServiceData, userRegistration, userLogin } from '../../apiCalls';
import { toast } from 'react-toastify';
import '../../App.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

  
const styles = {
  root: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
};


const Header = ({ category, setCategory, service, setSelectedService }) => {


    const [open, setOpen] = useState(false);

    const [isSidebarOpen, setSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    }

    const closeSidebar = () => {
      setSidebarOpen(false);
    };

    const [forLogin , setForLogin] = useState(true);

    const handleLogin = () => {
      setForLogin(true)
    }

    const handleCreate = () => {
      setForLogin(false)
    }

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    }


    const handleCategoryChange = (event) => {
      setCategory(event.target.value);
    };
  
    const handleServiceChange = (event) => {
      setSelectedService(event.target.value);
    };

    const [categoryData , setCategoryData ] = useState();

    const [services , setServices] = useState();

    const [isLogged , setIsLogged] = useState(false);

    const handleLogout = () => {
      localStorage.removeItem("top20User");
      localStorage.removeItem("DisplayName");
      setIsLogged(false)
    }


    useEffect(() => {

      const storedData = localStorage.getItem('top20User');

      if (storedData) {
          // setUserData(JSON.parse(storedData));
          setIsLogged(true)
      }

        getBusinessCategoriesData()
          .then((Response) => {
            if(Response.Message === "Sucess"){
              const activeCategories = Response.Data.filter(item => item.IsActive);
              setCategoryData(activeCategories);
            }else{
              toast.error("cannot get categories")
            }
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });


          
        getBusinessServiceData()
        .then((Response) => {
          if(Response.Message === "Sucess"){
            const activeServices = Response.Data.filter(item => item.IsActive);
            setServices(activeServices);
          }else{
            toast.error("cannot get services")
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });


      }, [isLogged]);


  
    const handlePage = (path) => {
      if(path === "home"){
        window.location.href = `/`
      }else{
        window.location.href = `/${path}`
      }
    }


    const [formData, setFormData] = useState({
      OrgId: top20.orgId,
      // MemberId: "",
      MemberName: '',
      DisplayName: '',
      DialCode: '',
      MobileNo: '',
      EmailId: '',
      AppPIN: '',
      TranPIN: '',
      AddressLine1: '',
      AddressLine2: '',
      AddressLine3: '',
      City: '',
      Country: '',
      PostalCode: '',
      FileName: '',
      // FilePath: "string",
      Logo_Img_Base64String: '',
      RatingValue: '',
    });
    
  
    const [errors, setErrors] = useState({});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  
    // const handleChange = (e) => {
    //   const { name, value } = e.target;
    //   setFormData((prev) => ({
    //     ...prev,
    //     [name]: value,
    //   }));
    //   validateField(name, value);
    // };

    const handleChange = (e) => {
      const { name, value } = e.target;
    
      // Update the form data state
      setFormData((prev) => {
        const updatedData = {
          ...prev,
          [name]: value,
        };
    
        // Store DisplayName in localStorage if the field being updated is DisplayName
        if (name === 'DisplayName') {
          localStorage.setItem('DisplayName', value);
        }
    
        return updatedData;
      });
    
      // Validate the field
      validateField(name, value);
    };
    
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            Logo_Img_Base64String: reader.result.split(',')[1],
            FileName: file.name,
          }));
          setErrors((prev) => ({ ...prev, FileName: '' }));
        };
        reader.readAsDataURL(file);
      } else {
        setErrors((prev) => ({ ...prev, FileName: 'Only image files are allowed' }));
      }
    };
  
    const validateField = (name, value) => {
      let error = '';
  
      switch (name) {
        case 'EmailId':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = 'Invalid email address';
          }
          break;
        // case 'AppPIN':
        //   if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
        //     error = 'Password must be at least 8 characters long and contain at least one number, one special character, and one alphabet';
        //   }
        //   break;
        // case 'PostalCode':
        //   if (!/^\d{6}$/.test(value)) { // Assuming postal code validation
        //     error = 'Invalid postal code';
        //   }
        //   break;
        default:
          break;
      }
  
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    };
  
    useEffect(() => {
      const hasErrors = Object.values(errors).some((error) => error);
      const excludedFields = ['AddressLine1', 'AddressLine2', 'AddressLine3', 'PostalCode', 'Logo_Img_Base64String', 'FileName', 'RatingValue'];

      const allFieldsFilled = Object.keys(formData)
        .filter(key => !excludedFields.includes(key))
        .every(key => formData[key] !== '');
      
      setIsSubmitDisabled(hasErrors || !allFieldsFilled);
    }, [errors, formData]);
  
    const handleSubmit = () => {
      if (!isSubmitDisabled) {
        setIsSubmitDisabled(true);
        userRegistration(formData)
          .then((response) => {
            if (response.Message === `Member Registration has been registered successfully!, Member Registration Id for reference ${response.Data}`){
              toast.success("Member Registration has been registered successfully!");
              localStorage.setItem('top20Login', true);
              localStorage.setItem('top20User', response.Data);
              // localStorage.setItem('UserData', response.Data)
              handleClose();
              window.location.href = `/`
            }else{
              toast.error(response.Message);
            }
          })
          .catch((error) => {
            console.error('Registration failed:', error);
          })
          .finally(() => {
            setIsSubmitDisabled(false);
          });
      }else{
        toast.error("Please fill all inputs")
      }
    };
  

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [loginErrors, setLoginErrors] = useState({ email: '' });
    const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  
    const validateEmail = (email) => {
      // Simple email validation regex
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };
  
    const handleLoginChange = (e) => {
      const { name, value } = e.target;
  
      setLoginData((prevLoginData) => ({
        ...prevLoginData,
        [name]: value,
      }));

  
      if (name === 'email') {
        const emailValid = validateEmail(value);
        setLoginErrors({
          email: emailValid ? '' : 'Invalid email address',
        });
        setIsLoginDisabled(!emailValid);
      }
    };
  
    const handleSignIn = () => {
      if (!loginErrors.email) {
        if(loginData.password){

            const data = {
              OrganizationId: top20.orgId,
              EmailId : loginData.email,
              Password : loginData.password
            }

            userLogin(data)
            .then((response) => {
              if(response.Message === "Sucess"){

                const data = response.Data[0];

                localStorage.setItem('top20User', data.MemberId);

                localStorage.setItem('DisplayName', data.DisplayName);

                toast.success("Successfully Logged in ")
                
                handleClose();

                setIsLogged(true);

                window.location.href = `/`;

              }else{
                toast.error(response.Message)
              }
            })
            .catch(e => {
              console.log(e)
              toast.error("Error Loging in")
            })




        }else{
          toast.error("Please enter password")
        }
      }
    };


    const handleHome = () => {
      window.location.href = "/"
    }


    const filterOptions = createFilterOptions({
      matchFrom: 'start',
      stringify: (option) => `${option.label} ${option.phone} ${option.code}`,
    });


    const countries = [
      { code: 'AD', label: 'Andorra', phone: '376' },
      {
        code: 'AE',
        label: 'United Arab Emirates',
        phone: '971',
      },
      { code: 'AF', label: 'Afghanistan', phone: '93' },
      {
        code: 'AG',
        label: 'Antigua and Barbuda',
        phone: '1-268',
      },
      { code: 'AI', label: 'Anguilla', phone: '1-264' },
      { code: 'AL', label: 'Albania', phone: '355' },
      { code: 'AM', label: 'Armenia', phone: '374' },
      { code: 'AO', label: 'Angola', phone: '244' },
      { code: 'AQ', label: 'Antarctica', phone: '672' },
      { code: 'AR', label: 'Argentina', phone: '54' },
      { code: 'AS', label: 'American Samoa', phone: '1-684' },
      { code: 'AT', label: 'Austria', phone: '43' },
      {
        code: 'AU',
        label: 'Australia',
        phone: '61',
        suggested: true,
      },
      { code: 'AW', label: 'Aruba', phone: '297' },
      { code: 'AX', label: 'Alland Islands', phone: '358' },
      { code: 'AZ', label: 'Azerbaijan', phone: '994' },
      {
        code: 'BA',
        label: 'Bosnia and Herzegovina',
        phone: '387',
      },
      { code: 'BB', label: 'Barbados', phone: '1-246' },
      { code: 'BD', label: 'Bangladesh', phone: '880' },
      { code: 'BE', label: 'Belgium', phone: '32' },
      { code: 'BF', label: 'Burkina Faso', phone: '226' },
      { code: 'BG', label: 'Bulgaria', phone: '359' },
      { code: 'BH', label: 'Bahrain', phone: '973' },
      { code: 'BI', label: 'Burundi', phone: '257' },
      { code: 'BJ', label: 'Benin', phone: '229' },
      { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
      { code: 'BM', label: 'Bermuda', phone: '1-441' },
      { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
      { code: 'BO', label: 'Bolivia', phone: '591' },
      { code: 'BR', label: 'Brazil', phone: '55' },
      { code: 'BS', label: 'Bahamas', phone: '1-242' },
      { code: 'BT', label: 'Bhutan', phone: '975' },
      { code: 'BV', label: 'Bouvet Island', phone: '47' },
      { code: 'BW', label: 'Botswana', phone: '267' },
      { code: 'BY', label: 'Belarus', phone: '375' },
      { code: 'BZ', label: 'Belize', phone: '501' },
      {
        code: 'CA',
        label: 'Canada',
        phone: '1',
        suggested: true,
      },
      {
        code: 'CC',
        label: 'Cocos (Keeling) Islands',
        phone: '61',
      },
      {
        code: 'CD',
        label: 'Congo, Democratic Republic of the',
        phone: '243',
      },
      {
        code: 'CF',
        label: 'Central African Republic',
        phone: '236',
      },
      {
        code: 'CG',
        label: 'Congo, Republic of the',
        phone: '242',
      },
      { code: 'CH', label: 'Switzerland', phone: '41' },
      { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
      { code: 'CK', label: 'Cook Islands', phone: '682' },
      { code: 'CL', label: 'Chile', phone: '56' },
      { code: 'CM', label: 'Cameroon', phone: '237' },
      { code: 'CN', label: 'China', phone: '86' },
      { code: 'CO', label: 'Colombia', phone: '57' },
      { code: 'CR', label: 'Costa Rica', phone: '506' },
      { code: 'CU', label: 'Cuba', phone: '53' },
      { code: 'CV', label: 'Cape Verde', phone: '238' },
      { code: 'CW', label: 'Curacao', phone: '599' },
      { code: 'CX', label: 'Christmas Island', phone: '61' },
      { code: 'CY', label: 'Cyprus', phone: '357' },
      { code: 'CZ', label: 'Czech Republic', phone: '420' },
      {
        code: 'DE',
        label: 'Germany',
        phone: '49',
        suggested: true,
      },
      { code: 'DJ', label: 'Djibouti', phone: '253' },
      { code: 'DK', label: 'Denmark', phone: '45' },
      { code: 'DM', label: 'Dominica', phone: '1-767' },
      {
        code: 'DO',
        label: 'Dominican Republic',
        phone: '1-809',
      },
      { code: 'DZ', label: 'Algeria', phone: '213' },
      { code: 'EC', label: 'Ecuador', phone: '593' },
      { code: 'EE', label: 'Estonia', phone: '372' },
      { code: 'EG', label: 'Egypt', phone: '20' },
      { code: 'EH', label: 'Western Sahara', phone: '212' },
      { code: 'ER', label: 'Eritrea', phone: '291' },
      { code: 'ES', label: 'Spain', phone: '34' },
      { code: 'ET', label: 'Ethiopia', phone: '251' },
      { code: 'FI', label: 'Finland', phone: '358' },
      { code: 'FJ', label: 'Fiji', phone: '679' },
      {
        code: 'FK',
        label: 'Falkland Islands (Malvinas)',
        phone: '500',
      },
      {
        code: 'FM',
        label: 'Micronesia, Federated States of',
        phone: '691',
      },
      { code: 'FO', label: 'Faroe Islands', phone: '298' },
      {
        code: 'FR',
        label: 'France',
        phone: '33',
        suggested: true,
      },
      { code: 'GA', label: 'Gabon', phone: '241' },
      { code: 'GB', label: 'United Kingdom', phone: '44' },
      { code: 'GD', label: 'Grenada', phone: '1-473' },
      { code: 'GE', label: 'Georgia', phone: '995' },
      { code: 'GF', label: 'French Guiana', phone: '594' },
      { code: 'GG', label: 'Guernsey', phone: '44' },
      { code: 'GH', label: 'Ghana', phone: '233' },
      { code: 'GI', label: 'Gibraltar', phone: '350' },
      { code: 'GL', label: 'Greenland', phone: '299' },
      { code: 'GM', label: 'Gambia', phone: '220' },
      { code: 'GN', label: 'Guinea', phone: '224' },
      { code: 'GP', label: 'Guadeloupe', phone: '590' },
      { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
      { code: 'GR', label: 'Greece', phone: '30' },
      {
        code: 'GS',
        label: 'South Georgia and the South Sandwich Islands',
        phone: '500',
      },
      { code: 'GT', label: 'Guatemala', phone: '502' },
      { code: 'GU', label: 'Guam', phone: '1-671' },
      { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
      { code: 'GY', label: 'Guyana', phone: '592' },
      { code: 'HK', label: 'Hong Kong', phone: '852' },
      {
        code: 'HM',
        label: 'Heard Island and McDonald Islands',
        phone: '672',
      },
      { code: 'HN', label: 'Honduras', phone: '504' },
      { code: 'HR', label: 'Croatia', phone: '385' },
      { code: 'HT', label: 'Haiti', phone: '509' },
      { code: 'HU', label: 'Hungary', phone: '36' },
      { code: 'ID', label: 'Indonesia', phone: '62' },
      { code: 'IE', label: 'Ireland', phone: '353' },
      { code: 'IL', label: 'Israel', phone: '972' },
      { code: 'IM', label: 'Isle of Man', phone: '44' },
      { code: 'IN', label: 'India', phone: '91' },
      {
        code: 'IO',
        label: 'British Indian Ocean Territory',
        phone: '246',
      },
      { code: 'IQ', label: 'Iraq', phone: '964' },
      {
        code: 'IR',
        label: 'Iran, Islamic Republic of',
        phone: '98',
      },
      { code: 'IS', label: 'Iceland', phone: '354' },
      { code: 'IT', label: 'Italy', phone: '39' },
      { code: 'JE', label: 'Jersey', phone: '44' },
      { code: 'JM', label: 'Jamaica', phone: '1-876' },
      { code: 'JO', label: 'Jordan', phone: '962' },
      {
        code: 'JP',
        label: 'Japan',
        phone: '81',
        suggested: true,
      },
      { code: 'KE', label: 'Kenya', phone: '254' },
      { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
      { code: 'KH', label: 'Cambodia', phone: '855' },
      { code: 'KI', label: 'Kiribati', phone: '686' },
      { code: 'KM', label: 'Comoros', phone: '269' },
      {
        code: 'KN',
        label: 'Saint Kitts and Nevis',
        phone: '1-869',
      },
      {
        code: 'KP',
        label: "Korea, Democratic People's Republic of",
        phone: '850',
      },
      { code: 'KR', label: 'Korea, Republic of', phone: '82' },
      { code: 'KW', label: 'Kuwait', phone: '965' },
      { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
      { code: 'KZ', label: 'Kazakhstan', phone: '7' },
      {
        code: 'LA',
        label: "Lao People's Democratic Republic",
        phone: '856',
      },
      { code: 'LB', label: 'Lebanon', phone: '961' },
      { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
      { code: 'LI', label: 'Liechtenstein', phone: '423' },
      { code: 'LK', label: 'Sri Lanka', phone: '94' },
      { code: 'LR', label: 'Liberia', phone: '231' },
      { code: 'LS', label: 'Lesotho', phone: '266' },
      { code: 'LT', label: 'Lithuania', phone: '370' },
      { code: 'LU', label: 'Luxembourg', phone: '352' },
      { code: 'LV', label: 'Latvia', phone: '371' },
      { code: 'LY', label: 'Libya', phone: '218' },
      { code: 'MA', label: 'Morocco', phone: '212' },
      { code: 'MC', label: 'Monaco', phone: '377' },
      {
        code: 'MD',
        label: 'Moldova, Republic of',
        phone: '373',
      },
      { code: 'ME', label: 'Montenegro', phone: '382' },
      {
        code: 'MF',
        label: 'Saint Martin (French part)',
        phone: '590',
      },
      { code: 'MG', label: 'Madagascar', phone: '261' },
      { code: 'MH', label: 'Marshall Islands', phone: '692' },
      {
        code: 'MK',
        label: 'Macedonia, the Former Yugoslav Republic of',
        phone: '389',
      },
      { code: 'ML', label: 'Mali', phone: '223' },
      { code: 'MM', label: 'Myanmar', phone: '95' },
      { code: 'MN', label: 'Mongolia', phone: '976' },
      { code: 'MO', label: 'Macao', phone: '853' },
      {
        code: 'MP',
        label: 'Northern Mariana Islands',
        phone: '1-670',
      },
      { code: 'MQ', label: 'Martinique', phone: '596' },
      { code: 'MR', label: 'Mauritania', phone: '222' },
      { code: 'MS', label: 'Montserrat', phone: '1-664' },
      { code: 'MT', label: 'Malta', phone: '356' },
      { code: 'MU', label: 'Mauritius', phone: '230' },
      { code: 'MV', label: 'Maldives', phone: '960' },
      { code: 'MW', label: 'Malawi', phone: '265' },
      { code: 'MX', label: 'Mexico', phone: '52' },
      { code: 'MY', label: 'Malaysia', phone: '60' },
      { code: 'MZ', label: 'Mozambique', phone: '258' },
      { code: 'NA', label: 'Namibia', phone: '264' },
      { code: 'NC', label: 'New Caledonia', phone: '687' },
      { code: 'NE', label: 'Niger', phone: '227' },
      { code: 'NF', label: 'Norfolk Island', phone: '672' },
      { code: 'NG', label: 'Nigeria', phone: '234' },
      { code: 'NI', label: 'Nicaragua', phone: '505' },
      { code: 'NL', label: 'Netherlands', phone: '31' },
      { code: 'NO', label: 'Norway', phone: '47' },
      { code: 'NP', label: 'Nepal', phone: '977' },
      { code: 'NR', label: 'Nauru', phone: '674' },
      { code: 'NU', label: 'Niue', phone: '683' },
      { code: 'NZ', label: 'New Zealand', phone: '64' },
      { code: 'OM', label: 'Oman', phone: '968' },
      { code: 'PA', label: 'Panama', phone: '507' },
      { code: 'PE', label: 'Peru', phone: '51' },
      { code: 'PF', label: 'French Polynesia', phone: '689' },
      { code: 'PG', label: 'Papua New Guinea', phone: '675' },
      { code: 'PH', label: 'Philippines', phone: '63' },
      { code: 'PK', label: 'Pakistan', phone: '92' },
      { code: 'PL', label: 'Poland', phone: '48' },
      {
        code: 'PM',
        label: 'Saint Pierre and Miquelon',
        phone: '508',
      },
      { code: 'PN', label: 'Pitcairn', phone: '870' },
      { code: 'PR', label: 'Puerto Rico', phone: '1' },
      {
        code: 'PS',
        label: 'Palestine, State of',
        phone: '970',
      },
      { code: 'PT', label: 'Portugal', phone: '351' },
      { code: 'PW', label: 'Palau', phone: '680' },
      { code: 'PY', label: 'Paraguay', phone: '595' },
      { code: 'QA', label: 'Qatar', phone: '974' },
      { code: 'RE', label: 'Reunion', phone: '262' },
      { code: 'RO', label: 'Romania', phone: '40' },
      { code: 'RS', label: 'Serbia', phone: '381' },
      { code: 'RU', label: 'Russian Federation', phone: '7' },
      { code: 'RW', label: 'Rwanda', phone: '250' },
      { code: 'SA', label: 'Saudi Arabia', phone: '966' },
      { code: 'SB', label: 'Solomon Islands', phone: '677' },
      { code: 'SC', label: 'Seychelles', phone: '248' },
      { code: 'SD', label: 'Sudan', phone: '249' },
      { code: 'SE', label: 'Sweden', phone: '46' },
      { code: 'SG', label: 'Singapore', phone: '65' },
      { code: 'SH', label: 'Saint Helena', phone: '290' },
      { code: 'SI', label: 'Slovenia', phone: '386' },
      {
        code: 'SJ',
        label: 'Svalbard and Jan Mayen',
        phone: '47',
      },
      { code: 'SK', label: 'Slovakia', phone: '421' },
      { code: 'SL', label: 'Sierra Leone', phone: '232' },
      { code: 'SM', label: 'San Marino', phone: '378' },
      { code: 'SN', label: 'Senegal', phone: '221' },
      { code: 'SO', label: 'Somalia', phone: '252' },
      { code: 'SR', label: 'Suriname', phone: '597' },
      { code: 'SS', label: 'South Sudan', phone: '211' },
      {
        code: 'ST',
        label: 'Sao Tome and Principe',
        phone: '239',
      },
      { code: 'SV', label: 'El Salvador', phone: '503' },
      {
        code: 'SX',
        label: 'Sint Maarten (Dutch part)',
        phone: '1-721',
      },
      {
        code: 'SY',
        label: 'Syrian Arab Republic',
        phone: '963',
      },
      { code: 'SZ', label: 'Swaziland', phone: '268' },
      {
        code: 'TC',
        label: 'Turks and Caicos Islands',
        phone: '1-649',
      },
      { code: 'TD', label: 'Chad', phone: '235' },
      {
        code: 'TF',
        label: 'French Southern Territories',
        phone: '262',
      },
      { code: 'TG', label: 'Togo', phone: '228' },
      { code: 'TH', label: 'Thailand', phone: '66' },
      { code: 'TJ', label: 'Tajikistan', phone: '992' },
      { code: 'TK', label: 'Tokelau', phone: '690' },
      { code: 'TL', label: 'Timor-Leste', phone: '670' },
      { code: 'TM', label: 'Turkmenistan', phone: '993' },
      { code: 'TN', label: 'Tunisia', phone: '216' },
      { code: 'TO', label: 'Tonga', phone: '676' },
      { code: 'TR', label: 'Turkey', phone: '90' },
      {
        code: 'TT',
        label: 'Trinidad and Tobago',
        phone: '1-868',
      },
      { code: 'TV', label: 'Tuvalu', phone: '688' },
      {
        code: 'TW',
        label: 'Taiwan',
        phone: '886',
      },
      {
        code: 'TZ',
        label: 'United Republic of Tanzania',
        phone: '255',
      },
      { code: 'UA', label: 'Ukraine', phone: '380' },
      { code: 'UG', label: 'Uganda', phone: '256' },
      {
        code: 'US',
        label: 'United States',
        phone: '1',
        suggested: true,
      },
      { code: 'UY', label: 'Uruguay', phone: '598' },
      { code: 'UZ', label: 'Uzbekistan', phone: '998' },
      {
        code: 'VA',
        label: 'Holy See (Vatican City State)',
        phone: '379',
      },
      {
        code: 'VC',
        label: 'Saint Vincent and the Grenadines',
        phone: '1-784',
      },
      { code: 'VE', label: 'Venezuela', phone: '58' },
      {
        code: 'VG',
        label: 'British Virgin Islands',
        phone: '1-284',
      },
      {
        code: 'VI',
        label: 'US Virgin Islands',
        phone: '1-340',
      },
      { code: 'VN', label: 'Vietnam', phone: '84' },
      { code: 'VU', label: 'Vanuatu', phone: '678' },
      { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
      { code: 'WS', label: 'Samoa', phone: '685' },
      { code: 'XK', label: 'Kosovo', phone: '383' },
      { code: 'YE', label: 'Yemen', phone: '967' },
      { code: 'YT', label: 'Mayotte', phone: '262' },
      { code: 'ZA', label: 'South Africa', phone: '27' },
      { code: 'ZM', label: 'Zambia', phone: '260' },
      { code: 'ZW', label: 'Zimbabwe', phone: '263' },
    ];


    const selectedCountry = countries.find(country => country.label === formData.Country);

  const handleCountryChange = (event, newValue) => {
    setFormData(prevData => ({
      ...prevData,
      Country: newValue ? newValue.label : '',
    }));
  };

  const selectedDialCode = countries.find(country => country.phone === formData.DialCode);

  const handleDialCodeChange = (event, newValue) => {
    setFormData(prevData => ({
      ...prevData,
      DialCode: newValue ? newValue.phone : ''
    }));
  };



    return(
        <>
          <React.Fragment>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
              sx={{
                "& .MuiDialog-paper": {
                  width: {
                    xs: "98%", 
                    md: "80%",
                  },
                  maxWidth: {
                    xs: "98%", 
                    md: "80%", 
                  },
                },
              }}
            >
              {forLogin ? (
                  <DialogContent sx={{padding:'0'}} >
                      <Box component="form" noValidate autoComplete="off" sx={{ flexGrow: 1 }}>
                        <Grid container>
                          <Grid item md={4} sx={{display:'flex',justifyContent:'center',alignItems:'center',background:'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 99%)'}}>
                            <Grid container spacing={2} direction='column' justifyContent='center' alignItems='center' textAlign='center' color='#fff' sx={{width:{xs:'95%',sm:'95%' , md:'70%'},padding:'5% 0%' ,margin:'0px auto'}}>
                              <Grid item >
                                <Typography variant='h4' fontWeight='bold'>Welcome !</Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant='body2'>New here? Create an account to join our community</Typography>
                              </Grid>
                              <Grid item>
                                <Button sx={{color:'#fff',border:'1px solid #fff', fontWeight:'bold'}} onClick={handleCreate}>Sign Up</Button>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item md={8} p={4}>
                            <Grid container spacing={2}>
                              <Grid container justifyContent='center' sx={{padding:'20px 0px'}}>
                                <Typography className='typo7'>Login</Typography>
                              </Grid>
                              {/* <Grid container justifyContent='center' sx={{padding:'10px 0px'}}>
                                <Typography sx={{display:'flex', alignItems:'end' }}>Create new Account ?</Typography>
                                <Typography sx={{cursor:'pointer', display:'flex', alignItems:'end' , color:'#2e6ed5', paddingLeft:{xs:'0',sm:'0' , md:'7px'}  }} onClick={handleCreate}> Click here.</Typography>
                              </Grid> */}
                              <Grid item xs={12} sm={12} md={12}>
                              <TextField
                                label="Email"
                                name="email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                fullWidth
                                required
                                error={!!loginErrors.email}
                                helperText={loginErrors.email}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <TextField
                                label="Password"
                                name="password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                fullWidth
                                required
                                error={!!loginErrors.password}
                                helperText={loginErrors.password}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSignIn}
                                disabled={isLoginDisabled}
                                sx={{float:'right'}}
                              >
                                Login
                              </Button>
                            </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                  </DialogContent>
              ):(
                  <DialogContent sx={{padding:'0'}} >
                    <Box component="form" noValidate autoComplete="off" sx={{ flexGrow: 1 }}>
                      <Grid container>
                        <Grid item md={4}  sx={{display:'flex',justifyContent:'center',alignItems:'center',background:'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 99%)'}}>
                          <Grid container spacing={3} direction='column' justifyContent='center' alignItems='center' textAlign='center' color='#fff' sx={{width:{xs:'95%',sm:'95%' , md:'70%'} ,padding:'5% 0%' ,margin:'0px auto'}}>
                            <Grid item >
                              <Typography variant='h4' fontWeight='bold'>Welcome Back !</Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant='body2'>To keep connected with us please login with your personal info</Typography>
                            </Grid>
                            <Grid item>
                              <Button sx={{color:'#fff',border:'1px solid #fff', fontWeight:'bold'}} onClick={handleLogin}>Log In</Button>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item md={8} p={4}>
                          <Grid container spacing={2}>
                            <Grid container justifyContent='center' sx={{padding:'20px 0px'}}>
                              <Typography className='typo7'>Create an account</Typography>
                            </Grid>
                            {/* <Grid container justifyContent='center' sx={{padding:'10px 0px'}}>
                              <Typography sx={{display:'flex', alignItems:'end' }}>Have an account?</Typography>
                              <Typography sx={{cursor:'pointer', display:'flex', alignItems:'end' , color:'#2e6ed5', paddingLeft:{xs:'0',sm:'0' , md:'7px'}  }} onClick={handleLogin}> Log in here.</Typography>
                            </Grid> */}
                            <Grid item xs={12} sm={12} md={6}>
                              <TextField
                                label="Member Name"
                                name="MemberName"
                                value={formData.MemberName}
                                onChange={handleChange}
                                fullWidth
                                required
                                error={!!errors.MemberName}
                                helperText={errors.MemberName}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                              <TextField
                                label="Display Name"
                                name="DisplayName"
                                value={formData.DisplayName}
                                onChange={handleChange}
                                fullWidth
                                required
                                error={!!errors.DisplayName}
                                helperText={errors.DisplayName}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Autocomplete
                                  id="country-select-demo"
                                  options={countries}
                                  value={selectedDialCode || null} 
                                  onChange={handleDialCodeChange}
                                  autoHighlight
                                  filterOptions={filterOptions}
                                  getOptionLabel={(option) => `(${option.code}) +${option.phone}`}
                                  renderOption={(props, option) => {
                                    const { key, ...optionProps } = props;
                                    return (
                                      <Box
                                        key={key}
                                        component="li"
                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                        {...optionProps}
                                      >
                                        <img
                                          loading="lazy"
                                          width="20"
                                          srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                          alt=""
                                        />
                                        {option.label} ({option.code}) +{option.phone}
                                      </Box>
                                    );
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Country Code"
                                      inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                      }}
                                    />
                                  )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                              <TextField
                                label="Mobile No"
                                name="MobileNo"
                                value={formData.MobileNo}
                                onChange={handleChange}
                                fullWidth
                                required
                                error={!!errors.MobileNo}
                                helperText={errors.MobileNo}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                              <TextField
                                label="Email ID"
                                name="EmailId"
                                value={formData.EmailId}
                                onChange={handleChange}
                                fullWidth
                                required
                                error={!!errors.EmailId}
                                helperText={errors.EmailId}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                              <TextField
                                label="Password"
                                name="AppPIN"
                                value={formData.AppPIN}
                                onChange={handleChange}
                                fullWidth
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                              <TextField
                                label="Transaction PIN"
                                name="TranPIN"
                                value={formData.TranPIN}
                                onChange={handleChange}
                                fullWidth
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Autocomplete
                                  id="country-select-demo"
                                  options={countries}
                                  value={selectedCountry || null} 
                                  onChange={handleCountryChange}
                                  autoHighlight
                                  filterOptions={filterOptions}
                                  getOptionLabel={(option) => `${option.label}`}
                                  renderOption={(props, option) => {
                                    const { key, ...optionProps } = props;
                                    return (
                                      <Box
                                        key={key}
                                        component="li"
                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                        {...optionProps}
                                      >
                                        <img
                                          loading="lazy"
                                          width="20"
                                          srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                          alt=""
                                        />
                                        {option.label} ({option.code}) +{option.phone}
                                      </Box>
                                    );
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Country"
                                      inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                      }}
                                    />
                                  )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                              <TextField
                                label="Postal Code"
                                name="PostalCode"
                                value={formData.PostalCode}
                                onChange={handleChange}
                                fullWidth
                                required
                                error={!!errors.PostalCode}
                                helperText={errors.PostalCode}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                              <TextField
                                label="Address Line 1"
                                name="AddressLine1"
                                value={formData.AddressLine1}
                                onChange={handleChange}
                                fullWidth
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                              <TextField
                                label="Address Line 2"
                                name="AddressLine2"
                                value={formData.AddressLine2}
                                onChange={handleChange}
                                fullWidth
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                              <TextField
                                label="Address Line 3"
                                name="AddressLine3"
                                value={formData.AddressLine3}
                                onChange={handleChange}
                                fullWidth
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                              <TextField
                                label="City"
                                name="City"
                                value={formData.City}
                                onChange={handleChange}
                                fullWidth
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                              <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="upload-logo"
                                type="file"
                                onChange={handleImageChange}
                                required
                              />
                              <label htmlFor="upload-logo">
                                <Button variant="contained" color="primary" component="span">
                                  Upload Profile Image
                                </Button>
                              </label>
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                disabled={isSubmitDisabled}
                                sx={{float:'right'}}
                              >
                                Submit
                              </Button>
                              {formData.FileName ? <Typography>{formData.FileName}</Typography> : null}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </DialogContent>
              )}

            </Dialog>
        
              <AppBar  position='relative' sx={{  background:'white', display: { md: 'none', sm: 'block' }}}>
                <Toolbar>
                  <Grid container justifyContent='space-between'  direction='row'>
                    <Grid item sx={{display:'flex' , alignItems:'center'}}>
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleSidebar}
                        sx={{ mr: 2, display: { md: 'none' } }}
                      >
                        <MenuIcon sx={{color:'black'}} />
                      </IconButton>
                      <img onClick={handleHome} src={logo} width='60px' alt='def1'/>
                    </Grid>
                    <Grid item sx={{display:'flex' , alignItems:'center'}}>
                      {isLogged ? (
                        <Typography sx={{fontWeight:'bold', textTransform:'uppercase', cursor:'pointer' , color:'black'}} onClick={handleLogout} >Logout</Typography>
                      ):(
                        <Typography sx={{fontWeight:'bold', textTransform:'uppercase', cursor:'pointer' ,color:'black'}} onClick={handleOpen} >Login</Typography>
                      )}
                    </Grid>
                  </Grid>

                </Toolbar>
              </AppBar>
                    {/* Sidebar */}
              <Drawer
                anchor="left"
                open={isSidebarOpen}
                onClose={closeSidebar}
                PaperProps={{
                  style: {
                    width: '70%',
                    background: 'white',
                  },
                }}
              >
                <List>
                  <ListItem onClick={closeSidebar} sx={{display:'flex' , justifyContent:'flex-end'}}>
                    <CloseIcon />
                  </ListItem>
                  <ListItem>
                      <Typography sx={{fontWeight:'bold', textTransform:'uppercase', color: isActive('/') ? '#2e6ed5' : 'black' ,cursor:'pointer'}} onClick={(e) => {handlePage("home")}} >Home</Typography>
                  </ListItem>
                  <ListItem onClick={closeSidebar}>
                            <Typography sx={{fontWeight:'bold', textTransform:'uppercase' , color: isActive('/about-us') ? '#2e6ed5' : 'black',cursor:'pointer' }} onClick={(e) => {handlePage("about-us")}} >About Us</Typography>
                  </ListItem>
                  <ListItem onClick={closeSidebar}>
                            <Typography sx={{fontWeight:'bold', textTransform:'uppercase' , color: isActive('/contact-us') ? '#2e6ed5' : 'black',cursor:'pointer' }} onClick={(e) => {handlePage("contact-us")}} >Contact Us</Typography>
                  </ListItem>
                  <ListItem onClick={closeSidebar}>
                            <Typography sx={{fontWeight:'bold', textTransform:'uppercase' , color: isActive('/privacy-policy') ? '#2e6ed5' : 'black',cursor:'pointer' }} onClick={(e) => {handlePage("privacy-policy")}} >Privacy policy</Typography>
                  </ListItem>
               
                  {/* Add more menu items as needed */}
                </List>
              </Drawer>
              {/* Desktop Header */}
              <AppBar position='relative' sx={{ background:'white',padding:'10px 0', display: { xs:'none', sm: 'none', md: 'block' } }}>
                <Toolbar sx={{width:'85%' , margin:'0 auto'}}>
                    <Grid container direction='row' justifyContent="space-between">
                        <Grid item xs={12} sm={12} md={2} sx={{textAlign:{xs:'center' , sm:'center' , md:'unset'}}}>
                            <img onClick={handleHome} src={logo} alt="d1" width="60%" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4.5} sx={{display: {xs:'none',sm:'none',md:'flex'}, justifyContent:'space-around' , alignItems:'center' }}>
                            <Typography className='typo10' sx={{fontWeight:'bold', textTransform:'uppercase', color: isActive('/') ? '#2e6ed5' : 'black' ,cursor:'pointer'}} onClick={(e) => {handlePage("home")}} >Home</Typography>
                            <Typography className='typo10' sx={{fontWeight:'bold', textTransform:'uppercase' , color: isActive('/about-us') ? '#2e6ed5' : 'black',cursor:'pointer' }} onClick={(e) => {handlePage("about-us")}} >About Us</Typography>
                            <Typography className='typo10' sx={{fontWeight:'bold', textTransform:'uppercase' , color: isActive('/contact-us') ? '#2e6ed5' : 'black',cursor:'pointer' }} onClick={(e) => {handlePage("contact-us")}} >Contact Us</Typography>
                            {isLogged ? (
                              <Typography className='typo10' sx={{fontWeight:'bold', textTransform:'uppercase', cursor:'pointer' , color:'black'}} onClick={handleLogout} >Logout</Typography>
                            ):(
                              <Typography className='typo10' sx={{fontWeight:'bold', textTransform:'uppercase', cursor:'pointer' ,color:'black'}} onClick={handleOpen} >Login</Typography>
                            )}
                        </Grid>
                        {/* <Grid item xs={12} sm={12} md={4.5} sx={{display:'flex'}} >
                          <Grid container justifyContent='space-between' alignItems='center'>
                          <Grid item xs={12} sm={5.9} >
                              <FormControl variant="outlined" fullWidth >
                              <Select
                                  sx={{border:'2px solid #2e6ed5'}}
                                  value={category}
                                  onChange={handleCategoryChange}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                              >
                                  <MenuItem value="ALLCAT001">
                                      <Typography  className='typo10' sx={{fontWeight:'bold' , textTransform:'uppercase'}}>All categories</Typography>
                                  </MenuItem>
                                  {categoryData && categoryData.length && categoryData.map((item, index) => (
                                      item.IsActive ? (
                                          <MenuItem key={index} value={item.BusinessCategoryId}>
                                              <Typography  className='typo10' sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{item.BusinessCategoryName}</Typography>
                                          </MenuItem>
                                      ) : null
                                  ))}
                              </Select>
                              </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={5.9}>
                              <FormControl variant="outlined" fullWidth>
                              <Select
                                  sx={{border:'2px solid #2e6ed5'}}
                                  value={service}
                                  onChange={handleServiceChange}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                              >
                                  <MenuItem value="ALLSER001">
                                      <Typography  className='typo10' sx={{fontWeight:'bold' , textTransform:'uppercase'}}>All Services</Typography>
                                  </MenuItem>
                                  {services && services.length && services.map((item, index) => (
                                      item.IsActive ? (
                                          <MenuItem key={index} value={item.BusinessServiceId}>
                                              <Typography  className='typo10' sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{item.BusinessServiceName}</Typography>
                                          </MenuItem>
                                      ) : null
                                  ))}
                              </Select>
                              </FormControl>
                          </Grid>

                          </Grid>
                        </Grid> */}
                    </Grid>
                </Toolbar>
              </AppBar>
          </React.Fragment>
        </>
    )
}


export default Header;