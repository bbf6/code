require 'rack/cors'

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'

    resource '*',
      headers: :any,
      methods: :any,
      expose: ['Authorization'],
      max_age: 600
  end
end
