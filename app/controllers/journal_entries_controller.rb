class JournalEntriesController < ApplicationController
     before_action :authenticate_user!
   
     def index
       @journal_entries = current_user.journal_entries
       render json: @journal_entries
     end
   
     def create
       @journal_entry = current_user.journal_entries.build(journal_entry_params)
       if @journal_entry.save
         render json: @journal_entry, status: :created
       else
         render json: @journal_entry.errors, status: :unprocessable_entity
       end
     end
   
     private
   
     def journal_entry_params
       params.require(:journal_entry).permit(:title, :content)
     end
   end
   