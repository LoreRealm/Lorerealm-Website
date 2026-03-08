use actix_cors::Cors;
use actix_files as fs;
use actix_web::{App, HttpResponse, HttpServer, Responder, Result, middleware, web};
use std::path::Path;

#[derive(serde::Serialize, serde::Deserialize)]
struct ApiResponse {
    message: String,
    status: String,
}

async fn health_check() -> Result<impl Responder> {
    Ok(HttpResponse::Ok().json(ApiResponse {
        message: "LoreRealm backend is running".to_string(),
        status: "healthy".to_string(),
    }))
}

async fn api_streams() -> Result<impl Responder> {
    Ok(HttpResponse::Ok().json(serde_json::json!({
        "streams": [
            {"name": "Pathfinder Session", "date": "2026-03-08"},
            {"name": "Campaign Planning", "date": "2026-03-15"},
            {"name": "Character Creation", "date": "2026-03-22"}
        ]
    })))
}

async fn spa_index() -> Result<impl Responder> {
    Ok(fs::NamedFile::open("../frontend/build/index.html")?)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let port = std::env::var("PORT").unwrap_or_else(|_| "10000".to_string());
    let host = std::env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string());

    let address = format!("{}:{}", host, port);
    println!("server starting on {}", address);

    let build_path = "../frontend/build";
    if !Path::new(build_path).exists() {
        println!("Warning: React build directory not found at {}", build_path);
        println!("   Run 'npm run build' in the frontend directory first");
    }

    println!("Starting LoreRealm server on http://{}:{}", host, port);

    HttpServer::new(|| {
        let cors = Cors::default()
            .allowed_origin("http://lorerealm.netlify.app")
            .allowed_origin("http://127.0.0.1:3000")
            .allowed_origin("http://localhost:8080")
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
            .allowed_headers(vec!["Content-Type", "Authorization"])
            .max_age(3600);

        App::new()
            .wrap(middleware::Logger::default())
            .wrap(cors)
            .service(
                web::scope("/api")
                    .route("/health", web::get().to(health_check))
                    .route("/streams", web::get().to(api_streams)),
            )
    })
    .bind(format!("{}:{}", host, port))?
    .run()
    .await
}
