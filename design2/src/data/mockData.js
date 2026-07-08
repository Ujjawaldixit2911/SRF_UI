export const FIELD_META = {
  salesperson:{name:'Sales Person', desc:'Reassign owner', lov:['Simran Kaur','Siddharth Rao','Harshit Jain','Vikas Pansari','Harsh Mehta'], flow:['Initiator','HOD (Marketing)','Oracle Push']},
  email:{name:'Email ID', desc:'Multi-site email', type:'email', flow:['Initiator','F&A','Oracle Push']},
  paymentTerm:{name:'Payment Term', desc:'Bill-to / Ship-to', lov:['Advance','LC at Sight','30 Days Credit','60 Days Credit','90 Days Credit','No Credit'], flow:['Initiator','F&A Head','Oracle Push']},
  creditLimit:{name:'Credit Limit', desc:'Account / site level', type:'number', flow:['Initiator','F&A Head','BCFO (if > threshold)','Oracle Push']},
  region:{name:'Region', desc:'Zone mapping', lov:['SOUTH EAST ASIA','EUROPE','MIDDLE EAST','DOMESTIC INDIA','SOUTH & LATIN AMERICA','AFRICA','NORTH AMERICA','SAARC'], flow:['Initiator','Zonal / Regional Head','Oracle Push']},
  profileClass:{name:'Profile Class', desc:'Domestic / Export', lov:['EXPORT','DOMESTIC','SCRAP'], flow:['Initiator','F&A','Oracle Push']},
  classification:{name:'Classification', desc:'Customer category', lov:['Internal','External','Related Party','Trader','OEM'], flow:['Initiator','HOD','Oracle Push']},
  address:{name:'Address', desc:'Postal / City', type:'text', flow:['Initiator','F&A','Oracle Push']},
  accountTag:{name:'Account Tag', desc:'Custom tag', type:'text', flow:['Initiator','HOD','Oracle Push']}
};

export const CUSTOMERS = [
  {id:'12706439', name:'CANDYPINK INVESTMENTS CC', custNo:'C-88401', pan:'', salesperson:'Simran Kaur', email:'accounts@candypink.co.za', country:'South Africa', region:'AFRICA', state:'KwaZulu-Natal', city:'Durban', paymentTerm:'30 Days Credit', creditLimit:'ZAR 1,200,000', profileClass:'EXPORT', classification:'External', operatingUnit:'ALTECH IN OU', status:'Active', flags:[],
    accounts:[{accNo:'321045', accName:'Candypink Investments CC', status:'Active', ou:'ALTECH IN OU', currency:'ZAR', creditLimit:'1,200,000',
      sites:[{siteNo:'S-90112', bu:'PFB Durban', country:'South Africa', siteName:'Durban Main', ou:'ALTECH IN OU', status:'Active', useCode:'BILL_TO', salesperson:'Simran Kaur', email:'accounts@candypink.co.za', paymentTerm:'30 Days Credit', city:'Durban', postal:'4001'},
             {siteNo:'S-90113', bu:'PFB Durban', country:'South Africa', siteName:'Durban Ship', ou:'ALTECH IN OU', status:'Active', useCode:'SHIP_TO', salesperson:'Simran Kaur', email:'accounts@candypink.co.za', paymentTerm:'30 Days Credit', city:'Durban', postal:'4001'}]}]},

  {id:'11902551', name:'KOROZO AMBALAJ SAN. VE TIC. A.S', custNo:'C-71220', pan:'', salesperson:'Simran Kaur', email:'purchasing@korozo.com.tr', country:'Turkey', region:'EUROPE', state:'Istanbul', city:'Istanbul', paymentTerm:'LC at Sight', creditLimit:'USD 850,000', profileClass:'EXPORT', classification:'External', operatingUnit:'PFB HU OU', status:'Active', flags:['Email mismatch across sites'],
    accounts:[{accNo:'440210', accName:'Korozo Ambalaj', status:'Active', ou:'PFB HU OU', currency:'USD', creditLimit:'850,000',
      sites:[{siteNo:'S-77010', bu:'PFB Hungary', country:'Turkey', siteName:'Istanbul HQ', ou:'PFB HU OU', status:'Active', useCode:'BILL_TO', salesperson:'Simran Kaur', email:'purchasing@korozo.com.tr', paymentTerm:'LC at Sight', city:'Istanbul', postal:'34000'},
             {siteNo:'S-77011', bu:'PFB Hungary', country:'Turkey', siteName:'Gebze Plant', ou:'PFB HU OU', status:'Active', useCode:'SHIP_TO', salesperson:'Simran Kaur', email:'orders@korozo.com.tr', paymentTerm:'LC at Sight', city:'Gebze', postal:'41400'}]}]},

  {id:'12455901', name:'DNP VIETNAM CO., LTD.', custNo:'C-66203', pan:'', salesperson:'Simran Kaur', email:'', country:'Vietnam', region:'', state:'Ha Nam', city:'Phu Ly', paymentTerm:'', creditLimit:'USD 300,000', profileClass:'EXPORT', classification:'External', operatingUnit:'PFB THAI OU', status:'Active', flags:['Missing Region','Missing Payment Term','Missing Email'],
    accounts:[{accNo:'512330', accName:'DNP Vietnam Co Ltd', status:'Active', ou:'PFB THAI OU', currency:'USD', creditLimit:'300,000',
      sites:[{siteNo:'S-61220', bu:'PFB Rayong', country:'Vietnam', siteName:'Phu Ly Factory', ou:'PFB THAI OU', status:'Active', useCode:'BILL_TO', salesperson:'Simran Kaur', email:'', paymentTerm:'', city:'Phu Ly', postal:'—'}]}]},

  {id:'12701001', name:'SRF INDUSTEX BELTING PTY LIMITED', custNo:'C-70455', pan:'', salesperson:'Harshit Jain', email:'ap@srfindustex.co.za', country:'South Africa', region:'AFRICA', state:'Gauteng', city:'Johannesburg', paymentTerm:'60 Days Credit', creditLimit:'ZAR 4,500,000', profileClass:'EXPORT', classification:'Related Party', operatingUnit:'PFB INDIA OU', status:'Active', flags:['Email mismatch across sites'],
    accounts:[{accNo:'330120', accName:'SRF Industex – Trade', status:'Active', ou:'PFB INDIA OU', currency:'ZAR', creditLimit:'4,500,000',
      sites:[{siteNo:'S-44120', bu:'PFB Indore (DTA)', country:'South Africa', siteName:'JHB Bill', ou:'PFB INDIA OU', status:'Active', useCode:'BILL_TO', salesperson:'Harshit Jain', email:'ap@srfindustex.co.za', paymentTerm:'60 Days Credit', city:'Johannesburg', postal:'2001'},
             {siteNo:'S-44121', bu:'PFB Indore (DTA)', country:'South Africa', siteName:'JHB Ship', ou:'PFB INDIA OU', status:'Active', useCode:'SHIP_TO', salesperson:'Harshit Jain', email:'logistics@srfindustex.co.za', paymentTerm:'60 Days Credit', city:'Johannesburg', postal:'2001'}]},
      {accNo:'330121', accName:'SRF Industex – Project', status:'Active', ou:'PFB INDIA OU', currency:'ZAR', creditLimit:'1,000,000',
      sites:[{siteNo:'S-44130', bu:'PFB Indore (DTA)', country:'South Africa', siteName:'Cape Town', ou:'PFB INDIA OU', status:'Active', useCode:'BILL_TO', salesperson:'Harshit Jain', email:'ap@srfindustex.co.za', paymentTerm:'60 Days Credit', city:'Cape Town', postal:'8001'}]}]},

  {id:'12690112', name:'PLASTIC CONNECTIONS, INC.', custNo:'C-69880', pan:'', salesperson:'Harshit Jain', email:'ap@plasticconnections.com', country:'United States', region:'NORTH AMERICA', state:'Illinois', city:'Chicago', paymentTerm:'Advance', creditLimit:'USD 0', profileClass:'EXPORT', classification:'External', operatingUnit:'PFB HU OU', status:'Active', flags:[],
    accounts:[{accNo:'358820', accName:'Plastic Connections Inc', status:'Active', ou:'PFB HU OU', currency:'USD', creditLimit:'0',
      sites:[{siteNo:'S-55210', bu:'PFB Hungary', country:'United States', siteName:'Chicago HQ', ou:'PFB HU OU', status:'Active', useCode:'BILL_TO', salesperson:'Harshit Jain', email:'ap@plasticconnections.com', paymentTerm:'Advance', city:'Chicago', postal:'60601'}]}]},

  {id:'12488220', name:'MYI DELTA TRADING CO LLC', custNo:'C-64110', pan:'', salesperson:'Vikas Pansari', email:'finance@myidelta.ae', country:'United Arab Emirates', region:'MIDDLE EAST', state:'Dubai', city:'Dubai', paymentTerm:'90 Days Credit', creditLimit:'USD 2,000,000', profileClass:'EXPORT', classification:'Trader', operatingUnit:'PFB INDIA OU', status:'Active', flags:[],
    accounts:[{accNo:'301180', accName:'MYI Delta Trading', status:'Active', ou:'PFB INDIA OU', currency:'USD', creditLimit:'2,000,000',
      sites:[{siteNo:'S-40110', bu:'PFB Indore (DTA)', country:'United Arab Emirates', siteName:'JAFZA', ou:'PFB INDIA OU', status:'Active', useCode:'BILL_TO', salesperson:'Vikas Pansari', email:'finance@myidelta.ae', paymentTerm:'90 Days Credit', city:'Dubai', postal:'17000'}]}]},

  {id:'12511777', name:'SCIENTEX PACKAGING (AYER KEROH) BERHAD', custNo:'C-65540', pan:'', salesperson:'Vikas Pansari', email:'po@scientex.com.my', country:'Malaysia', region:'SOUTH EAST ASIA', state:'Melaka', city:'Ayer Keroh', paymentTerm:'60 Days Credit', creditLimit:'USD 1,750,000', profileClass:'EXPORT', classification:'External', operatingUnit:'PFB THAI OU', status:'Active', flags:[],
    accounts:[{accNo:'520410', accName:'Scientex Packaging', status:'Active', ou:'PFB THAI OU', currency:'USD', creditLimit:'1,750,000',
      sites:[{siteNo:'S-62210', bu:'PFB Rayong', country:'Malaysia', siteName:'Ayer Keroh', ou:'PFB THAI OU', status:'Active', useCode:'BILL_TO', salesperson:'Vikas Pansari', email:'po@scientex.com.my', paymentTerm:'60 Days Credit', city:'Ayer Keroh', postal:'75450'},
             {siteNo:'S-62211', bu:'PFB Rayong', country:'Malaysia', siteName:'Pulau Indah', ou:'PFB THAI OU', status:'Active', useCode:'SHIP_TO', salesperson:'Vikas Pansari', email:'po@scientex.com.my', paymentTerm:'60 Days Credit', city:'Pulau Indah', postal:'42920'}]}]},

  {id:'12633401', name:'CROWN CHEMICAL CO.,LTD', custNo:'C-68120', pan:'', salesperson:'Harsh Mehta', email:'trade@crownchem.co.kr', country:'South Korea', region:'SOUTH EAST ASIA', state:'Seoul', city:'Seoul', paymentTerm:'LC at Sight', creditLimit:'USD 900,000', profileClass:'EXPORT', classification:'External', operatingUnit:'PFB THAI OU', status:'Active', flags:['Non-standard sales person name'],
    accounts:[{accNo:'524110', accName:'Crown Chemical Co', status:'Active', ou:'PFB THAI OU', currency:'USD', creditLimit:'900,000',
      sites:[{siteNo:'S-63310', bu:'PFB Rayong', country:'South Korea', siteName:'Seoul Office', ou:'PFB THAI OU', status:'Active', useCode:'BILL_TO', salesperson:'Harsh Mehta', email:'trade@crownchem.co.kr', paymentTerm:'LC at Sight', city:'Seoul', postal:'04520'}]}]},

  {id:'12655120', name:'ROYAL STICK ENTERPRISES PRIVATE LIMITED', custNo:'C-68990', pan:'AAFCR2993D', salesperson:'Harsh Mehta', email:'accounts@royalstick.in', country:'India', region:'DOMESTIC INDIA', state:'Madhya Pradesh', city:'Indore', paymentTerm:'30 Days Credit', creditLimit:'INR 5,000,000', profileClass:'DOMESTIC', classification:'External', operatingUnit:'PFB INDIA OU', status:'Active', flags:[],
    accounts:[{accNo:'300455', accName:'Royal Stick Enterprises', status:'Active', ou:'PFB INDIA OU', currency:'INR', creditLimit:'5,000,000',
      sites:[{siteNo:'S-41010', bu:'PFB Indore (DTA)', country:'India', siteName:'Indore Plant', ou:'PFB INDIA OU', status:'Active', useCode:'BILL_TO', salesperson:'Harsh Mehta', email:'accounts@royalstick.in', paymentTerm:'30 Days Credit', city:'Indore', postal:'452001'}]}]},

  {id:'12677230', name:'BIOPLAST SRL', custNo:'C-69410', pan:'', salesperson:'Siddharth Rao', email:'amministrazione@bioplast.it', country:'Italy', region:'EUROPE', state:'Lombardy', city:'Milan', paymentTerm:'60 Days Credit', creditLimit:'EUR 600,000', profileClass:'EXPORT', classification:'External', operatingUnit:'PFB SA OU', status:'Inactive', flags:['Inactive account'],
    accounts:[{accNo:'610220', accName:'Bioplast SRL', status:'Inactive', ou:'PFB SA OU', currency:'EUR', creditLimit:'600,000',
      sites:[{siteNo:'S-70210', bu:'PFB Durban', country:'Italy', siteName:'Milan HQ', ou:'PFB SA OU', status:'Inactive', useCode:'BILL_TO', salesperson:'Siddharth Rao', email:'amministrazione@bioplast.it', paymentTerm:'60 Days Credit', city:'Milan', postal:'20100'}]}]}
];

export const RT_ACTIONABLE=[
 ['CM-6678','DAFS SCHOOL','','PENDING AT INITIATOR','New Customer','01-APR-2025','SKUMAR','PFB INDIA OU','PFB Indore (DTA)'],
 ['CM-6294','SRF INDUSTEX BELTING PTY LIMITED','','PENDING AT INITIATOR','Modify Multiple Site Email','06-FEB-2025','SKUMAR','PFB INDIA OU',''],
 ['CM-6284','MYI DELTA TRADING CO LLC','','PENDING AT INITIATOR','Modify Multiple Site Email','06-FEB-2025','SKUMAR','PFB INDIA OU',''],
 ['CM-6078','HINTAMI','','PENDING AT INITIATOR','Modify Site Email','06-JAN-2025','SKUMAR','PFB INDIA OU','PFB Indore (DTA)'],
 ['CM-5424','CARE CUSTOMER THAI','','PENDING AT INITIATOR','New Site','21-JUN-2024','SKUMAR','PFB THAI OU','PFB Rayong'],
 ['CM-5397','FOREIGNONE','','PENDING AT INITIATOR','New Customer','21-JUN-2024','SKUMAR','PFB THAI OU','PFB Rayong'],
 ['CM-5378','YESBURGMAN','','PENDING AT INITIATOR','New Customer','21-JUN-2024','SKUMAR','PFB THAI OU','PFB Rayong'],
 ['CM-5261','THAI EVEN CUSTO','','PENDING AT INITIATOR','New Customer','17-JUN-2024','SKUMAR','PFB THAI OU','PFB Rayong'],
 ['CM-5257','THAI ONLY DAY CUSTOMER','','PENDING AT INITIATOR','New Account','17-JUN-2024','SKUMAR','PFB THAI OU','PFB Rayong'],
 ['CM-4601','KANGAROO CUSTOMER','','PENDING AT INITIATOR','New Account','08-APR-2024','SKUMAR','PFB HU OU','PFB Hungary']
];

export const RT_NONACT=[
 ['CM-7198','IRFAN TEST HU','','PENDING WITH ORACLE-1','New Customer','SKUMAR','03-JUL-2026','EDIT.TARCSAY','Level 3 of 3','PFB HU OU','PFB Hungary'],
 ['CM-7192','SAMETOHU','','PENDING FOR APPROVAL','New Customer','SKUMAR','02-JUL-2026','ARIHANT.AGARWAL','Level 1 of 3','PFB HU OU','PFB Hungary'],
 ['CM-7189','ASKFGJ','','PENDING FOR APPROVAL','New Customer','SKUMAR','01-JUL-2026','ARIHANT.AGARWAL','Level 1 of 3','PFB INDIA OU',''],
 ['CM-7184','PLASTIC CONNECTIONS, INC.','','PENDING FOR APPROVAL','Create/Modify Account Relationship','SKUMAR','30-JUN-2026','ARIHANT.AGARWAL','Level 1 of 3','PFB HU OU',''],
 ['CM-7183','PLASTIC CONNECTIONS, INC.','','PENDING FOR APPROVAL','Create/Modify Account Relationship','SKUMAR','30-JUN-2026','ARIHANT.AGARWAL','Level 1 of 3','PFB HU OU',''],
 ['CM-7181','VEGA MUSIC-1','','PENDING FOR APPROVAL','New Customer','SKUMAR','30-JUN-2026','VIKAS','Level 1 of 3','PFB SA OU','PFB Durban'],
 ['CM-7179','ROYAL STICK ENTERPRISES PRIVATE LIMITED','AAFCR2993D','PENDING FOR APPROVAL','New Account','SKUMAR','26-JUN-2026','ARIHANT.AGARWAL','Level 1 of 3','PFB INDIA OU','PFB Indore (DTA)'],
 ['CM-7178','JFHDS','AQWSQ1221R','PENDING FOR APPROVAL','New Customer','SKUMAR','26-JUN-2026','ARIHANT.AGARWAL','Level 1 of 3','PFB INDIA OU','PFB Indore (DTA)'],
 ['CM-7177','BIOPLAST SRL','','PENDING WITH ORACLE-1','New Site','SKUMAR','25-JUN-2026','BARUN.MAITY','Level 4 of 4','PFB SA OU','PFB Durban'],
 ['CM-7176','SRF INDUSTEX BELTING PTY LIMITED','','PENDING AT FINANCE POOL','Modify Multiple Site Email','SKUMAR','11-JUN-2026','FINANCE','Level 2 of 2','PFB INDIA OU','']
];

export const RT_DRAFTS=[
 ['CM-7201','ASD - SRF','SAVED','SKUMAR','PFB THAI OU','PFB Rayong','07-JUL-26','New Customer'],
 ['CM-7191','SRF INDUSTEX BELTING PTY LIMITED','SAVED','SKUMAR','PFB INDIA OU','','02-JUL-26','New Account'],
 ['CM-7190','ZASFAF','SAVED','SKUMAR','PFB INDIA OU','','01-JUL-26','New Customer'],
 ['CM-7188','CANDYPINK INVESTMENTS CC','SAVED','SKUMAR','ALTECH IN OU','','01-JUL-26','New Account'],
 ['CM-7187','ASDHB','SAVED','SKUMAR','ALTECH IN OU','','01-JUL-26','New Customer']
];
