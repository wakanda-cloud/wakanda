class DashboardEvents {

    frequencyNextWeek(event) {
        alert('next');
    }

    frequencyPreviousWeek(event) {
        alert('previous');
    }

    showMoreMostPopularFeatures(event, success) {
        var number = prompt("Number of most popular features expected");
        $.ajax({
            url: '/reloadMostPopularFeatures?quantity=' + number,
            success: success
        });
    }
}