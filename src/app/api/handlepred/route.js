import { connectDB } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";
// import sendMail from "@/helper/emailService";
import { NextResponse } from "next/server";


const places = [
  {"District":"Kachchh","Latitude":23.2,"Longitude":69.5},
  {"District":"Bharuch","Latitude":21.7,"Longitude":73.0},
  {"District":"Jamnagar","Latitude":22.5,"Longitude":70.1},
  {"District":"Bhavnagar","Latitude":21.8,"Longitude":72.1},
  {"District":"Devbhumi Dwarka","Latitude":22.2,"Longitude":68.9},
  {"District":"Surat","Latitude":21.2,"Longitude":72.8},
  {"District":"Valsad","Latitude":20.6,"Longitude":72.9},
  {"District":"Navsari","Latitude":20.9,"Longitude":72.9},
  {"District":"Dang","Latitude":20.8,"Longitude":73.4},
  {"District":"Ahmedabad (coastal part)","Latitude":23.0,"Longitude":72.5},
  {"District":"Mumbai","Latitude":19.0,"Longitude":72.8},
  {"District":"Raigad","Latitude":18.4,"Longitude":73.0},
  {"District":"Ratnagiri","Latitude":16.9,"Longitude":73.3},
  {"District":"Sindhudurg","Latitude":16.2,"Longitude":73.7},
  {"District":"Thane","Latitude":19.3,"Longitude":72.9},
  {"District":"Palghar","Latitude":19.7,"Longitude":72.7},
  {"District":"Goa (North)","Latitude":15.6,"Longitude":73.8},
  {"District":"Goa (South)","Latitude":15.2,"Longitude":74.0},
  {"District":"Uttara Kannada","Latitude":14.9,"Longitude":74.3},
  {"District":"Dakshina Kannada","Latitude":12.9,"Longitude":74.9},
  {"District":"Udupi","Latitude":13.3,"Longitude":74.7},
  {"District":"Kasaragod","Latitude":12.5,"Longitude":75.0},
  {"District":"Kannur","Latitude":11.9,"Longitude":75.4},
  {"District":"Kozhikode","Latitude":11.3,"Longitude":75.8},
  {"District":"Malappuram","Latitude":11.0,"Longitude":76.1},
  {"District":"Thrissur","Latitude":10.5,"Longitude":76.2},
  {"District":"Ernakulam","Latitude":10.0,"Longitude":76.3},
  {"District":"Alappuzha","Latitude":9.5,"Longitude":76.3},
  {"District":"Kollam","Latitude":9.0,"Longitude":76.6},
  {"District":"Thiruvananthapuram","Latitude":8.5,"Longitude":77.0},
  {"District":"Nagapattinam","Latitude":10.8,"Longitude":79.8},
  {"District":"Cuddalore","Latitude":11.7,"Longitude":79.8},
  {"District":"Chennai","Latitude":13.1,"Longitude":80.3},
  {"District":"Kanchipuram","Latitude":12.8,"Longitude":79.7},
  {"District":"Thiruvarur","Latitude":10.8,"Longitude":79.6},
  {"District":"Pondicherry","Latitude":11.9,"Longitude":79.8},
  {"District":"Karaikal","Latitude":10.9,"Longitude":79.8},
  {"District":"East Godavari","Latitude":17.0,"Longitude":82.3},
  {"District":"West Godavari","Latitude":16.8,"Longitude":81.7},
  {"District":"Visakhapatnam","Latitude":17.7,"Longitude":83.3},
  {"District":"Krishna","Latitude":16.8,"Longitude":80.6},
  {"District":"Nellore","Latitude":14.5,"Longitude":79.9},
  {"District":"Srikakulam","Latitude":18.3,"Longitude":83.9},
  {"District":"Ganjam","Latitude":19.3,"Longitude":85.0},
  {"District":"Balasore","Latitude":21.5,"Longitude":86.9},
  {"District":"Jagatsinghpur","Latitude":20.3,"Longitude":86.2},
  {"District":"Kendrapara","Latitude":20.5,"Longitude":86.4},
  {"District":"Bhadrak","Latitude":21.1,"Longitude":86.8},
  {"District":"Puri","Latitude":19.8,"Longitude":85.8},
  {"District":"Bhubaneswar","Latitude":20.3,"Longitude":85.8},
  {"District":"North 24 Parganas","Latitude":22.9,"Longitude":88.5},
  {"District":"South 24 Parganas","Latitude":22.0,"Longitude":88.4},
  {"District":"Haora","Latitude":22.6,"Longitude":88.3},
  {"District":"Purba Medinipur","Latitude":21.7,"Longitude":87.7},
  {"District":"Paschim Medinipur","Latitude":22.4,"Longitude":87.0},
  {"District":"East Midnapore","Latitude":21.8,"Longitude":87.6}
]

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const {prediction,user}= body;

    const users = await User.aggregate([
      {
        $project: {
          email: 1,
          state: 1,
          notifications: 1,
          notificationPreference: 1,
          _id: 1,
        },
      },
    ]);
    console.log("users", users);
    // Loop through each user
    for (const us of users) {
        if(us.email==user.email){
            if (user.prediction==1) {
          
          return NextResponse.json({ success: false, message: "Your area is at risk of flooding. Please take necessary actions to prevent damage to your property." });
         

        }
        else if (apiResponse.data==2){
            return NextResponse.json({ success: false, message: "Your area is at risk of Cyclonical Activity. Please take necessary actions to prevent damage to your property." });
        

         
        }
        else if(apiResponse.data==3){
            return NextResponse.json({ success: false, message: "Your area is at risk of high Sea level. Please take necessary actions to prevent damage to your property." });
        }
        else{
            return NextResponse.json({ success: false, message: "Given  area is out of coastal area." });
        }
      
        }
      
            
     

      return NextResponse.json({ success: false, message: "Something went wrong!" });
    }

    return NextResponse.json({ success: true, message: "all users processed." });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message });
  }
}

