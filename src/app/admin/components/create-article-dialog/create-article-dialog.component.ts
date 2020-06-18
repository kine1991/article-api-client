import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleService } from '../../services/article.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-article-dialog',
  templateUrl: './create-article-dialog.component.html',
  styleUrls: ['./create-article-dialog.component.scss']
})
export class CreateArticleDialogComponent implements OnInit, OnDestroy {
  public filterSubscription: Subscription;

  public createArticleForm;
  public filterData;
  
  public isSelectAuthor = true;
  public isSelectCategory = true;

  constructor(
    public dialogRef: MatDialogRef<CreateArticleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private articleService: ArticleService,
  ) { }

  ngOnInit() {
    this.createArticleForm = new FormGroup({
      title: new FormControl('learn from them so seamlessly that you might believe', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
      author: new FormControl('Robert Smidth', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      category: new FormControl('Sport', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
      description: new FormControl('at the Munich Center for Mathematical Philosophy in Germany, told author Michael Brooks that a mathematically precise definition of consciousness could mean that the cosmos is suffused with subjective experience. “This could be the beginning of a scientific revolution', [Validators.required, Validators.minLength(2), Validators.maxLength(350)]),
      priority: new FormControl('1'),
      imageUrl: new FormControl('https://material.angular.io/assets/img/examples/shiba2.jpg'),
      content: new FormControl(' “Aren’t you worried”—here the woman begins shaking her head—“that you could infect other people if you get sick inside?” “No,” she says. “I’m covered in Jesus’ blood.” As a result, she added, being infected when shopping isn’t scary or nerve-wracking. Religion is an important way people cope with catastrophes. It has been shown that people are more religiously active in the wake of crises. In a 2017 study, Philipp Ager and Antonio Ciccone found that religious participation increases with the risk of destructive rainfall;1 Emmanuelle Auriol and his colleagues likewise found, in a 2017 study, that people donate more to churches in the event of catastrophes, mainly as a form of insurance—the idea being that, should circumstances become dire, the donations would increase the odds of the divine intervening on their behalf.2 More recently, in a 2019 study, Jeanet Bentzen found that when struck by catastrophe, people seek closeness to God and pray more often.3 In a new paper, consistent with these findings, Bentzen reports recent evidence showing that religiosity has increased during this global crisis.4 Naturally, this means that people might feel a particularly strong need for their church community. Yet, with large gatherings of people being strongly discouraged, many religious leaders have moved their services online, or are careful to maintain social distance when welcoming people into their churches. Christians who prayed for hurricane victims donated less than Christians who did not pray for the victims.It makes sense that people pray more when dealing with major catastrophes. Prayer has been shown to benefit mental health.5,6 For people of faith, prayers can be part of important self-care, helping people to deal with the challenges the COVID-19 pandemic poses to mental well-being, such as anxiety caused by fear for one’s health and that of loved ones, or depression and anxiety from the self-isolation measures many countries have either recommended or enforced.Prayers can also give people a sense of purpose and guidance in difficult times. Many doctors and nurses, during moments they can spare away from the stress of treating patients, are retreating to their hospital rooftops and helipads to pray together. Religious Christians (the majority of Americans) also value receiving prayers from others. In a recent study, my collaborator Shiri Noy and I found that Christians, in the wake of personal hardship,', [Validators.required, Validators.minLength(100)]),
    });

    this.filterSubscription = this.articleService.getFilter().subscribe(filter => {
      this.filterData = filter.data;
      console.log(filter);
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  submit() {
    if (this.createArticleForm.valid) {
      this.articleService.createArticle(this.createArticleForm.value).subscribe(data => {
        console.log('data', data);
        this.dialogRef.close('reload');
        this._snackBar.open('article was created', 'close', { duration: 4000 });
      });
    }
  }

  isSelectAuthorChange(value) {
    this.isSelectAuthor = value;
  }

  isSelectCategoryChange(value) {
    console.log(value)
    this.isSelectCategory = value;
  }

  ngOnDestroy() {
    if (this.filterSubscription) this.filterSubscription.unsubscribe();
  }
}
