import { ReviewsProvider } from './../../providers/reviews/reviews';
import { AddReviewPage } from './../add-review/add-review';
import { Component } from "@angular/core";
import { NavController, ModalController } from 'ionic-angular';
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  reviews: any;
 
  constructor(public nav: NavController, public ReviewsProvider: ReviewsProvider, public modalCtrl: ModalController) {
 
  }
 
  ionViewDidLoad(){
 
    this.ReviewsProvider.getReviews().then((data) => {
      console.log(data);
      this.reviews = data;
    });
 
  }
 
  addReview(){
 
    let modal = this.modalCtrl.create(AddReviewPage);
 
    modal.onDidDismiss(review => {
      if(review){
        this.reviews.push(review);
        this.ReviewsProvider.createReview(review);       
      }
    });
 
    modal.present();
 
  }
 
  deleteReview(review){
 
    //Remove locally
      let index = this.reviews.indexOf(review);
 
      if(index > -1){
        this.reviews.splice(index, 1);
      }  
 
    //Remove from database
    this.ReviewsProvider.deleteReview(review._id);
  }
 
}