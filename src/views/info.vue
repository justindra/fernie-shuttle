<template>
  <div class="info">
    <p>
      The shuttle will operate daily between 8:00am and 11:30pm starting December 14, 2019 until
      Sunday April 12, 2020.
    </p>
    <h2>Fares</h2>

    <ul>
      <li>$4 cash only each way</li>
      <li>Kids 5 & under ride free with paying adult/caregiver</li>
      <li>$35 for a 10 Ride Booklet</li>
    </ul>

    <p>
      Booklets can't be purchased from the shuttle drivers, pre-purchase at Guest Services at Fernie
      Alpine Resort or at participating hotels/shuttle stop locations.
    </p>
    <p>
      <strong
        >NEW!! A shuttle season pass will be available soon for $299 plus tax. Limited quantity
        available. Purchase now at Guest Services at Fernie Alpine Resort.</strong
      >
    </p>
    <p>
      Individual bus fare is paid in cash on the bus with exact change only, no change is provided,
      or with a voucher from a 10 Ride Shuttle Booklet. Seats are first-come first-served, no
      pre-booking of seats available.
    </p>

    <h2>Schedule</h2>
    <p>
      Bus pull over locations may vary slightly due to excess snow or parking/pull-over ability.
    </p>
    <p>Details and schedule subject to change without notice.</p>
    <p>April may see daytime and evening service reduced.</p>
    <p>
      Download the PDF Schedule
      <a
        target="_blank"
        href="https://tourismfernie.com/uploads/listings/92/FerniestokeSkiShuttleSchedule_2019-2020-2.pdf"
        >here</a
      >.
    </p>

    <h2>About the Shuttle</h2>
    <p>
      The shuttle program is a partnership between the
      <a target="_blank" href="https://www.fernie.ca/">City of Fernie</a>,
      <a target="_blank" href="https://www.skifernie.com/">Fernie Alpine Resort</a>, Tourism Fernie
      and the
      <a target="_blank" href="https://www.ferniechamber.com/">Fernie Chamber of Commerce</a>. Two
      24-passenger buses will be used in the operation. The service is being operated by Fernie
      Alpine Resort. Funding for the purchase of the two buses was through the
      <a
        target="_blank"
        href="https://www2.gov.bc.ca/gov/content/tourism-immigration/tourism-resources/tourism-funding-programs/resort-municipality-funding-rmi"
        >Resort Municipality Initiative</a
      >.
    </p>

    <span class="love"
      >Made with <img src="@/assets/heart.svg" alt="" /> in
      <a href="https://github.com/justindra/fernie-shuttle" target="_blank">Fernie</a></span
    >
  </div>
</template>

<style lang="less" scoped>
.info {
  padding: 1rem;

  max-height: calc(100vh - 7rem);
  overflow: auto;
}

span.love {
  margin-top: 2rem;
  color: #666;
  display: block;
  text-align: center;
  a {
    color: #000000;
    text-decoration: none;
    &:hover {
      cursor: pointer;
    }
  }

  img {
    height: 1rem;
  }
}
</style>
