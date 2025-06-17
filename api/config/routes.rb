Rails.application.routes.draw do
  scope :api do
    get 'tree' => 'code_file#index'
    get 'file/:id' => 'code_file#file_content'
  end
end
