class UsersController < ApplicationController

	def show
      @user = User.find(params[:id])
      # redirect_to action: 'index', status: 301 unless @poll.friendly_id == params[:id]
    end

end