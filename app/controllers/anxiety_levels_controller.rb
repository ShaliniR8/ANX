class AnxietyLevelsController < ApplicationController
  before_action :authenticate_user!

  def index
    @anxiety_levels = current_user.anxiety_levels
    render json: @anxiety_levels
  end

  def create
    @anxiety_level = current_user.anxiety_levels.build(anxiety_level_params)
    if @anxiety_level.save
      render json: @anxiety_level, status: :created
    else
      render json: @anxiety_level.errors, status: :unprocessable_entity
    end
  end

  private

  def anxiety_level_params
    params.require(:anxiety_level).permit(:level, :date)
  end
end
