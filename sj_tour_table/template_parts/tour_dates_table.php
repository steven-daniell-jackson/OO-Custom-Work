<?php 	

$tour_data = get_query_var( 'acf_data' );
$table_headings = ["Tours", 'Tour Dates', '', '', ''];
$maximum_tour_count = 4;


?>
<table class="sj-tour-dates-table">

	<tr>	
		<?php 	

// Table Headings
		foreach ($table_headings as $value) {
			echo "<th>$value</th>";
		}

		?>

	</tr>

	<?php 	

// Tour Data
	foreach ($tour_data as $tour) {

		if (sizeof($tour['tourDates']['date']) > 2) {
		echo "<tr>";
		echo "<td>".$tour['tour']."</td>";

		
		for ($i=1; $i	< $maximum_tour_count + 1; $i	++) { 

			if (!empty($tour['tourDates']['date'][$i]['date'])) {
				echo "<td>". $tour['tourDates']['date'][$i]['date'] . "</td>";
			} else {
				echo "<td></td>";
			}

		}

		echo "</tr>";

}
	} 
	?>

</table>