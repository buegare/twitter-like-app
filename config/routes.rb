Rails.application.routes.draw do
  devise_for :users, :controllers => { :registrations => "user/registrations" }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # devise_scope :user do
	 #  get 'sign_up', to: 'devise/registrations#new'
  # end

  authenticated :user do
    root "tweets#index", as: "authenticated_root"
  end

 resources :tweets
 # resources :users, only: [:show]
 get ':id', to: 'users#show', as: "user"
end
