import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BikeActivityMetadataEnvelope} from '../../../../core/firebase/model/bike-activity-metadata-envelope.model';

/**
 * Displays bike activity list item
 */
@Component({
  selector: 'app-bike-activity-list-item',
  templateUrl: './bike-activity-list-item.component.html',
  styleUrls: ['./bike-activity-list-item.component.scss']
})
export class BikeActivityListItemComponent implements OnInit {

  /** Bike activity metadata */
  @Input() bikeActivityMetadata: BikeActivityMetadataEnvelope;
  /** Event emitter indicating click on a bike activity */
  @Output() bikeActivityClickedEventEmitter = new EventEmitter<string>();

  /** Start time */
  startTime = '';
  /** End time */
  endTime = '';

  //
  // Helper
  //

  /**
   * Formats date
   * @param epochSecond epoch seconds
   */
  static getDateLong(epochSecond: number): string {
    const date = new Date(0);
    date.setUTCSeconds(epochSecond);

    const dateStringElements = date.toDateString().split(' ');
    const timeStringElements = date.toTimeString().split(' ');

    const month = dateStringElements[1];
    const day = dateStringElements[2];
    const time = timeStringElements[0];

    return `${month} ${day} ${time}`;
  }

  /**
   * Formats date
   * @param epochSecond epoch seconds
   */
  static getDateShort(epochSecond: number): string {
    const date = new Date(0);
    date.setUTCSeconds(epochSecond);

    const timeStringElements = date.toTimeString().split(' ');

    const time = timeStringElements[0];

    return `${time}`;
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init phase
   */
  ngOnInit() {
    this.startTime = BikeActivityListItemComponent.getDateLong(this.bikeActivityMetadata.bikeActivity.startTime.epochSecond);
    this.endTime = BikeActivityListItemComponent.getDateShort(this.bikeActivityMetadata.bikeActivity.endTime.epochSecond);
  }

  //
  // Actions
  //

  /**
   * Handles click on activity
   */
  onBikeActivityClicked() {
    this.bikeActivityClickedEventEmitter.emit(this.bikeActivityMetadata.bikeActivity.uid);
  }
}
