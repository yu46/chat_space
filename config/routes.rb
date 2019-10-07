Rails.application.routes.draw do
  devise_for :users

  resources :users, only: [:edit, :update]
  root to: 'messages#index'
  resources :groups, only: [:new, :create, :edit, :update]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
