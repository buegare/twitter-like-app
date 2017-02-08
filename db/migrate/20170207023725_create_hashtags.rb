class CreateHashtags < ActiveRecord::Migration[5.0]
  def change
    create_table :hashtags do |t|
      t.string :word

      t.timestamps
    end
    add_index :hashtags, :word
  end
end
