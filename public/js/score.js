function addToScoreboard(){
    var tbody = $(".placar").find("tbody");
    var user = "Chris";
    var numWords = $("#contador-palavras").text();

    var row = newRow(user, numWords);
    row.find(".botao-remover").click(removeRow);
 
    tbody.prepend(row);

}

function newRow(user, numWords){    // Creates a complete new row
    var row = $("<tr>");
    var userColumn = $("<td>").text(user);
    var wordsColumn = $("<td>").text(numWords);
    var removeColumn = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icon = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icon);
    removeColumn.append(link);
    row.append(userColumn);
    row.append(wordsColumn);
    row.append(removeColumn);
   
    //console.log(row);

    return row;

}

function removeRow(){
    $(".botao-remover").click(function(event){
        event.preventDefault(); // Prevent the default behaviour of JS that would try to "leave" the page because of the #
        $(this).parent().parent().remove(); // Removes the grandparent (The row)
    });
}