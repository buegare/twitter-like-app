class User::RegistrationsController < Devise::RegistrationsController
  before_filter :configure_permitted_parameters
  
  protected
  
  def configure_permitted_parameters
    # devise_parameter_sanitizer.for(:sign_up).push(:fullname, :username)
    # devise_parameter_sanitizer.for(:account_update).push(:fullname, :username)
    devise_parameter_sanitizer.permit(:sign_up, keys: [:fullname, :username])
    devise_parameter_sanitizer.permit(:account_update, keys: [:fullname, :username])
  end
end