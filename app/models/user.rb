class User < ApplicationRecord
  extend FriendlyId
  friendly_id :username, use: :slugged

  has_many :tweets
  has_many :follows
  has_many :followers

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
