class Tweet < ApplicationRecord
	validates :body, :length => { :maximum => 140, :too_long => "%{count} characters is the maximum allowed" }

	belongs_to :user
	
	has_attached_file :photo, styles: { large: "1600x900>", medium: "300x300>", thumb: "50x50#" },
  							url: "/assets/tweets/:id/:style/:basename.:extension",
  							path: ":rails_root/public/assets/tweets/:id/:style/:basename.:extension"
  	validates_attachment_content_type :photo, content_type: /\Aimage\/.*\z/

end
