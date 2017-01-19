class Tweet < ApplicationRecord
	belongs_to :user
	
	has_attached_file :photo, styles: { large: "1600x900>", medium: "300x300>", thumb: "50x50#" },
  							url: "/assets/users/:id/:style/:basename.:extension",
  							path: ":rails_root/public/assets/users/:id/:style/:basename.:extension"
  	validates_attachment_content_type :photo, content_type: /\Aimage\/.*\z/
end
