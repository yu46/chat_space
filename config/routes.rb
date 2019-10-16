Rails.application.routes.draw do
  root to: 'groups#index'
  devise_for :users
  
  resources :users, only: [:edit, :update, :index]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]

    namespace :api do
      resources :messages, only: :index, defaults: {format: 'json'}
    end
  end
end
