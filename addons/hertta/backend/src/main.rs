#[macro_use]
extern crate rocket;

use rocket::serde::json::Json;
use std::collections::HashMap;
use rocket::http::Method;
use rocket_cors::{AllowedHeaders, AllowedOrigins, CorsOptions};

mod input_data; // Assuming this module contains InputData struct
mod errors;

#[post("/process_json", format = "application/json", data = "<building_info>")]
async fn submit_data(building_info: Json<input_data::InputData>) -> Json<HashMap<String, String>> {
    // Extract data and process as needed
    println!("Received JSON data: {:?}", building_info);

    // Access and print the name of the first node (example)
    if let Some(first_node) = building_info.nodes.values().next() {
        println!("Name of the first node: {}", first_node.name);
    }

    // Prepare and return a response
    let mut response = HashMap::new();
    response.insert("status".to_string(), "success".to_string());

    Json(response)
}

#[launch]
fn rocket() -> _ {
    let cors = CorsOptions {
        allowed_origins: AllowedOrigins::all(),
        allowed_methods: vec![Method::Post].into_iter().map(From::from).collect(),
        allowed_headers: AllowedHeaders::all(),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors()
    .expect("Failed to create CORS configuration");

    rocket::build()
        .mount("/", routes![submit_data])
        .attach(cors)
}
