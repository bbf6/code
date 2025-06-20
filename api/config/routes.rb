Rails.application.routes.draw do
  scope :api do
    mount ActionCable.server => '/cable'

    get 'tree' => 'code_file#index'
    get 'file/:id' => 'code_file#file_content'
    post 'file' => 'code_file#create'
    put 'file/:id' => 'code_file#update'
    delete 'file/:id' => 'code_file#delete'
  end
end
