Rails.application.routes.draw do
  devise_for :users, :controllers => { :registrations => "user/registrations" }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # devise_scope :user do
	 #  get 'sign_up', to: 'devise/registrations#new'
  # end

  authenticated :user do
    root "tweets#index", as: "authenticated_root"
  end

  root 'tweets#index'

 resources :tweets
 # resources :users, only: [:update, :show]
 get 'search_users', to: 'users#search_users'
 get ':id', to: 'users#show', as: "user"
 patch ':id', to: 'users#update', as: "user_update"
 get ':id', to: 'users#edit', as: "edit_user"
 post 'handle_friendship', to: 'friendships#handle_friendship'
 get ':id/following', to: 'users#show_following', as: "show_following"
 get ':id/followers', to: 'users#show_followers', as: "show_followers"
 delete ':id', to: 'users#remove_image', as: "remove_image"
 get 'hashtag/:word', to: 'hashtags#show', as: "hashtag"
end
