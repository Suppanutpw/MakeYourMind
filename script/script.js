var topic_form = document.getElementById('topic_form');
var choice_form = document.getElementById('choice_form');

var choice_count = 0;
var benefit_data_count = [];
var disadvantage_data_count = [];

topic_form.onsubmit = function(e){
  e.preventDefault();

  //Hide Submit button after first click
  var hide_button = document.getElementById('topic_form');
  hide_button.innerHTML = '<input id="after_submit" type="text" name="topic" value="' + hide_button.topic.value + '" placeholder="หัวข้อในการตัดสินใจ">'

  document.getElementById('topic_zone').style.cssText = 'top: 87px;';
  setTimeout(function() {
    document.getElementById("topic_zone").classList.remove('before_submit');
    add_choice_form();
  }, 400);
}

function gototop(){
  window.scrollTo({top: 0, behavior: 'smooth'});
}

//ALL INPUT FORM
function choice_input_form(i, choiceName=""){
  all_form = '<input type="text" name="choiceName'+ i +'" value="' + choiceName + '" class="choice_input" placeholder="ทางเลือก" autocomplete="off">';
  all_form += '<button type="submit" onclick="remove_choice_form(' + (i) + ')">ลบ</button><br>';
  return all_form;
}
function benefit_input_form(i, j, banefit_var="", isnewblock=false){
  all_form = '<textarea name="benefitData'+ (i) + (j) +'" class="benefit_input' + (i) + '" placeholder="ข้อดี/ประโยชน์ที่ได้รับ">' + banefit_var + '</textarea>';
  all_form += '<button id="benefitremove" type="submit" onclick="remove_benefit_form(' + (i) + ', ' + (j) + ')">ลบ</button>';

  if (isnewblock)
    all_form = '<div id="addbedis_form" class="addbedis_form">' + all_form + '</div>';
  return all_form;
}
function disadvantage_input_form(i, j, disadvantage_var="", isnewblock=false){
  all_form = '<textarea name="disadvantage_Data'+ (i) + (j) +'" class="disadvantage_input' + (i) + '" placeholder="ข้อเสีย/ความเสี่ยงที่จะเกิด">' + disadvantage_var + '</textarea>';
  all_form += '<button id="disadvantageremove" type="submit" onclick="remove_disadvantage_form(' + (i) + ', ' + (j) + ')">ลบ</button>';

  if (isnewblock)
    all_form = '<div id="addbedis_form" class="addbedis_form">' + all_form + '</div>';
  return all_form;
}
function add_benefit_button(i){
  return '<button type="submit" onclick="add_benefit_form(' + (i) + ')">เพิ่มประโยชน์/ข้อดี</button><br>';
}
function add_disadvantage_button(i){
  return '<button type="submit" onclick="add_disadvantage_form(' + (i) + ')">เพิ่มความเสี่ยง/ข้อเสีย</button><br>';
}
function add_choice_button(){
  addform = '<div class="bottom_button"><button id="add_choice" onclick="add_choice_form()" name="addchoice">เพิ่มทางเลือก</button>';
  addform += '<button id="center_choice" onclick="gototop()"><i class="fa fa-angle-double-up"></i></button>';
  addform += '<button id="make_choice" onclick="makeupchoice()" name="submit">ตัดสินใจ</button><div>';
  return addform;
}


function add_benefit_form(choiceindex){ //add benefit form
  benefit_data_count[choiceindex] += 1;

  var showform = document.getElementById('choice_form');
  var all_form = "";

  var choice_data = document.getElementsByClassName('choice_input');
  for (i=0; i<choice_count; i++){ //Keep old Data
    all_form += choice_input_form(i, choice_data[i].value);

    //Benefit form
    all_form += '<div class="bedis_form"><div class="benefit_form"><h3>ข้อดี/ผลประโยชน์</h3>';
    var benefit_data = document.getElementsByClassName('benefit_input' + i);
    var loop_count = benefit_data_count[i] - (i == choiceindex);
    for (j=0; j<loop_count; j++)
      all_form += benefit_input_form(i, j, banefit_var=benefit_data[j].value);
    if (i == choiceindex)
      all_form += benefit_input_form(i, j, '', isnewblock=true); //For new block animation
    all_form += add_benefit_button(i) + '</div>';

    //disadvantage Form
    all_form += '<div class="disadvantage_form"><h3>ข้อเสีย/ความเสี่ยง</h3>';
    var disadvantage_data = document.getElementsByClassName('disadvantage_input' + i);
    for (j=0; j<disadvantage_data_count[i]; j++)
      all_form += disadvantage_input_form(i, j, disadvantage_var=disadvantage_data[j].value);
    all_form += add_disadvantage_button(i) + '</div></div>';
  }
  all_form += add_choice_button();

  showform.innerHTML = all_form; //Show in choice_form
  setTimeout(function() {
    document.getElementById("addbedis_form").classList.remove('addbedis_form'); //Remove Class for fade in animation
  }, 10);
}

function add_disadvantage_form(choiceindex){ //add disadvantage form
  disadvantage_data_count[choiceindex] += 1;

  var showform = document.getElementById('choice_form');
  var all_form = "";

  var choice_data = document.getElementsByClassName('choice_input');
  for (i=0; i<choice_count; i++){ //Keep old Data
    all_form += choice_input_form(i, choice_data[i].value);

    //Benefit form
    all_form += '<div class="bedis_form"><div class="benefit_form"><h3>ข้อดี/ผลประโยชน์</h3>';
    var benefit_data = document.getElementsByClassName('benefit_input' + i);
    for (j=0; j<benefit_data_count[i]; j++)
      all_form += benefit_input_form(i, j, banefit_var=benefit_data[j].value);
    all_form += add_benefit_button(i) + '</div>';

    //disadvantage Form
    all_form += '<div class="disadvantage_form"><h3>ข้อเสีย/ความเสี่ยง</h3>';
    var disadvantage_data = document.getElementsByClassName('disadvantage_input' + i);
    var loop_count = disadvantage_data_count[i] - (i == choiceindex);
    for (j=0; j<loop_count; j++)
      all_form += disadvantage_input_form(i, j, disadvantage_var=disadvantage_data[j].value);
    if (i == choiceindex)
      all_form += disadvantage_input_form(i, j, '', isnewblock=true);
    all_form += add_disadvantage_button(i) + '</div></div>';
  }
  all_form += add_choice_button();

  showform.innerHTML = all_form; //Show in choice_form
  setTimeout(function() {
    document.getElementById("addbedis_form").classList.remove('addbedis_form'); //Remove Class for fade in animation
  }, 10);
}

function remove_benefit_form(remove_i, remove_j){
  var showform = document.getElementById('choice_form');
  var all_form = "";

  var choice_data = document.getElementsByClassName('choice_input');
  for (i=0; i<choice_count; i++){ //Keep old Data
    all_form += choice_input_form(i, choice_data[i].value);

    //Benefit form
    all_form += '<div class="bedis_form"><div class="benefit_form"><h3>ข้อดี/ผลประโยชน์</h3>';
    var benefit_data = document.getElementsByClassName('benefit_input' + i), movetoleft = false;
    for (j=0; j<benefit_data_count[i]; j++){
      if (i != remove_i || j != remove_j){
        all_form += benefit_input_form(i, j-movetoleft, banefit_var=benefit_data[j].value);
      }else {
        movetoleft = true;
      }
    }
    all_form += add_benefit_button(i) + '</div>';

    //disadvantage Form
    all_form += '<div class="disadvantage_form"><h3>ข้อเสีย/ความเสี่ยง</h3>';
    var disadvantage_data = document.getElementsByClassName('disadvantage_input' + i);
    for (j=0; j<disadvantage_data_count[i]; j++)
      all_form += disadvantage_input_form(i, j, disadvantage_var=disadvantage_data[j].value);
    all_form += add_disadvantage_button(i) + '</div></div>';
  }
  all_form += add_choice_button();

  benefit_data_count[remove_i] -= 1;
  showform.innerHTML = all_form; //Show in choice_form
}

function remove_disadvantage_form(remove_i, remove_j){
  var showform = document.getElementById('choice_form');
  var all_form = "";

  var choice_data = document.getElementsByClassName('choice_input');
  for (i=0; i<choice_count; i++){ //Keep old Data
    all_form += choice_input_form(i, choice_data[i].value);

    //Benefit form
    all_form += '<div class="bedis_form"><div class="benefit_form"><h3>ข้อดี/ผลประโยชน์</h3>';
    var benefit_data = document.getElementsByClassName('benefit_input' + i);
    for (j=0; j<benefit_data_count[i]; j++)
      all_form += benefit_input_form(i, j, banefit_var=benefit_data[j].value);
    all_form += add_benefit_button(i) + '</div>';

    //disadvantage Form
    all_form += '<div class="disadvantage_form"><h3>ข้อเสีย/ความเสี่ยง</h3>';
    var disadvantage_data = document.getElementsByClassName('disadvantage_input' + i), movetoleft = false;
    for (j=0; j<disadvantage_data_count[i]; j++){
      if (i != remove_i || j != remove_j){
        all_form += disadvantage_input_form(i, j-movetoleft, disadvantage_var=disadvantage_data[j].value);
      }else {
        movetoleft = true;
      }
    }
    all_form += add_disadvantage_button(i) + '</div></div>';
  }
  all_form += add_choice_button();

  disadvantage_data_count[remove_i] -= 1;
  showform.innerHTML = all_form; //Show in choice_form
}

function add_choice_form(){ //Add Choice input +1 form
  choice_count += 1; //Start from 1

  var showform = document.getElementById('choice_form');
  var all_form = "";

  if (choice_count != 1){ //If haven't any choice form
    var choice_data = document.getElementsByClassName('choice_input');
    for (i=0; i<choice_count-1; i++){ //Keep old Data
      all_form += choice_input_form(i, choice_data[i].value); //Choice name

      //Benefit form
      all_form += '<div class="bedis_form"><div class="benefit_form"><h3>ข้อดี/ผลประโยชน์</h3>';
      var benefit_data = document.getElementsByClassName('benefit_input' + i);
      for (j=0; j<benefit_data_count[i]; j++)
        all_form += benefit_input_form(i, j, banefit_var=benefit_data[j].value);
      all_form += add_benefit_button(i) + '</div>';

      //disadvantage form
      all_form += '<div class="disadvantage_form"><h3>ข้อเสีย/ความเสี่ยง</h3>';
      var disadvantage_data = document.getElementsByClassName('disadvantage_input' + i);
      for (j=0; j<disadvantage_data_count[i]; j++)
        all_form += disadvantage_input_form(i, j, disadvantage_var=disadvantage_data[j].value);
      all_form += add_disadvantage_button(i) + '</div></div>';
    }
  }
  benefit_data_count[choice_count - 1] = disadvantage_data_count[choice_count - 1] = 0;
  all_form += '<div class="addchoice_form" id="addchoice_form">' + choice_input_form(choice_count-1); //New input
  all_form += '<div class="bedis_form"><div class="benefit_form"><h3>ข้อดี/ผลประโยชน์</h3>' + add_benefit_button(choice_count-1) + '</div>';
  all_form += '<div class="disadvantage_form"><h3>ข้อเสีย/ความเสี่ยง</h3>' + add_disadvantage_button(choice_count-1) + '</div></div>';

  all_form += add_choice_button() + '</div>';

  showform.innerHTML = all_form; //Show in choice_form
  setTimeout(function() {
    document.getElementById("addchoice_form").classList.remove('addchoice_form'); //Remove Class for fade in animation
  }, 10);
}

function remove_choice_form(choiceindex){
  if (choice_count == 1){
    swal({
      title: "คำเตือน",
      text: "คุณไม่สามารถลบทางเลือกทั้งหมดได้",
      type: "warning",
    });
    return;
  }swal({
    title: "แน่ใจหรือปล่าว?",
    text: "ถ้าหากกดลบไปผลดี/ผลเสียของตัวเลือกนั้นก็จะหายไปด้วยนะ",
    type: "warning",
    showCancelButton: true,
    confirmButtonClass: "btn-danger",
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Comfirm",
    closeOnConfirm: true
  },
  function(){
    var showform = document.getElementById('choice_form');
    var all_form = "";

    var choice_data = document.getElementsByClassName('choice_input'), movetoleft = false;
    for (i=0; i<choice_count; i++){ //Keep old Data
      if (i != choiceindex){
        all_form += choice_input_form(i-movetoleft, choice_data[i].value);

        //Benefit form
        all_form += '<div class="bedis_form"><div class="benefit_form"><h3>ข้อดี/ผลประโยชน์</h3>';
        var benefit_data = document.getElementsByClassName('benefit_input' + i);
        for (j=0; j<benefit_data_count[i]; j++)
          all_form += benefit_input_form(i-movetoleft, j, banefit_var=benefit_data[j].value);
        all_form += add_benefit_button(i-movetoleft) + '</div>';

        //disadvantage Form
        all_form += '<div class="disadvantage_form"><h3>ข้อเสีย/ความเสี่ยง</h3>';
        var disadvantage_data = document.getElementsByClassName('disadvantage_input' + i);
        for (j=0; j<disadvantage_data_count[i]; j++)
            all_form += disadvantage_input_form(i-movetoleft, j, disadvantage_var=disadvantage_data[j].value);
        all_form += add_disadvantage_button(i-movetoleft) + '</div></div>';

        benefit_data_count[i-movetoleft] = benefit_data_count[i];
        disadvantage_data_count[i-movetoleft] = disadvantage_data_count[i];
      }else {
        movetoleft = true;
      }
    }
    choice_count -= 1;
    all_form += add_choice_button();

    showform.innerHTML = all_form; //Show in choice_form
  });
}

function makeupchoice(){
  result_output = '<center><h1>Make<span style="color: #F16645;">Your</span>Mind</h1>';

  var showoutput = document.getElementById('result');
  var bedis_ratio = [], benefit_length = [], disadvantage_length = [], choice_array = [];

  var choice_data = document.getElementsByClassName('choice_input');
  for (i=0; i<choice_count; i++){
    choice_array[i] = choice_data[i].value;

    //Benefit form
    benefit_length[i] = 0;
    var benefit_data = document.getElementsByClassName('benefit_input' + i);
    for (j=0; j<benefit_data_count[i]; j++){
      benefit_length[i] += benefit_data[j].value.length;
    }
    //disadvantage form
    disadvantage_length[i] = 0;
    var disadvantage_data = document.getElementsByClassName('disadvantage_input' + i)
    for (j=0; j<disadvantage_data_count[i]; j++){
      disadvantage_length[i] += disadvantage_data[j].value.length;
    }

    if (disadvantage_length[i] != 0){
      bedis_ratio[i] = (benefit_data_count[i]/disadvantage_data_count[i]) * (benefit_length[i]/disadvantage_length[i]);
    }else if (disadvantage_length[i] == 0){
      bedis_ratio[i] = (benefit_data_count[i]/disadvantage_data_count[i]) * benefit_length[i];
    }else{
      bedis_ratio[i] = benefit_data_count[i] * (benefit_length[i]/disadvantage_length[i]);
    }
  }

  //Find max of benefit choice
  var ratio_max = -1, pos = [], max_count = 0;
  for (i=0; i<choice_count; i++){
    if (ratio_max < bedis_ratio[i]){
      ratio_max = bedis_ratio[i];
      max_count = 0;
      pos[max_count] = i;
    }else if (ratio_max == bedis_ratio[i]) {
      if (benefit_data_count[i] > benefit_data_count[pos] || disadvantage_data_count[i] < benefit_data_count[pos]){
        ratio_max = bedis_ratio[i];
        max_count = 0;
        pos[count] = i;
      }else{
        max_count += 1;
        pos[max_count] = i;
      }
    }
  }

  if (choice_array[pos[0]] == undefined || ratio_max == 0 || ratio_max == NaN){
    swal({
      title: "คำเตือน",
      text: "กรุณาใส่ข้อมูลในทางเลือกอย่างน้อย 1 ข้อ",
      type: "warning",
    });
    return 0;
  }if (max_count != 0){
    result_output += '<h2>ฉันลังเลระหว่าง <span style="color: #F16645;">';
    for (i=0; i<max_count; i++){
      result_output += choice_array[pos[i]] + ', ';
    }
    result_output += choice_array[pos[i]] + '</span></h2>'
  }else{
    if (ratio_max > 1.5){
      result_output += '<h2>ลอง <span style="color: #F16645;">' + choice_array[pos] + '</span> ไปเลย!!!</h2>';
    }else if (ratio_max > 1){
      result_output += '<h2>ลอง <span style="color: #F16645;">' + choice_array[pos] + '</span> ดูสิ</h2>';
    }else if (ratio_max > 0.8) {
      result_output += '<h2>ก็คุ้มค่าที่จะลอง <span style="color: #F16645;">' + choice_array[pos] + '</span> อยู่นะ</h2>';
    }else if (ratio_max > 0.5) {
      result_output += '<h2>จะลองเสี่ยง <span style="color: #F16645;">' + choice_array[pos] + '</span> ดูมั้ย?</h2>';
    }else{
      result_output += '<h2>ไม่ควรที่จะลองอะไรแต่เสี่ยง <span style="color: #F16645;">' + choice_array[pos] + '</span> ดูก็ได้</h2>';
    }
  }
  result_output += '<h3>ทางเลือก<span style="color: #F63535;">การตัดสินใจสุดท้ายเป็นของคุณ</span>เลือกในทาง<span style="color: #F63535;">ตามใจตัวเอง</span>ดีกว่า</h3>'

  //MakeYourMind Animation
  //Fade out
  document.getElementById("contentid").style.transition = "0.3s";
  document.getElementById("contentid").style.opacity = 0;
  setTimeout(function() {
    document.getElementById("contentid").style.display = "none";
  }, 300);

  //2 ปุ่มสุดท้ายคือปุ่มแก้ กับรีเฟรชหน้าใหม่ (มี center เหมือนเดิม)
  setTimeout(function() {
    showoutput.innerHTML = result_output + show_table(bedis_ratio);
  }, 500);

  //Fade In
  /*setTimeout(function() {
    document.getElementById("contentid").style.opacity = 1;
    document.getElementById("contentid").style.display = "block";
  }, 500);*/
}

function show_table(bedis_ratio){
  var result_output = '<h2 style="font-size: 42px; font-family: kanit_bold;">ทางเลือกทั้งหมดจาก ' + document.getElementById('topic_form').topic.value  + '</h2><br><center><table>';

  var choice_data = document.getElementsByClassName('choice_input');
  for (i=0; i<choice_count; i++){
    if (bedis_ratio[i] == 0)
      continue;
    result_output += '<tr class="topic_row"><th colspan="2">--- ' + choice_data[i].value + ' ---</th></tr>'; //Topic Name Row
    result_output += '<tr><th class="benefit_topic_col">ข้อดี/ผลประโยชน์</th><th class="disadvantage_topic_col">ข้อเสีย/ความเสี่ยง</th></tr>'; //Benefit and Disadventage Topic Row

    //Benefit form
    result_output += '<tr><td class="benefit_col">';
    var benefit_data = document.getElementsByClassName('benefit_input' + i);
    for (j=0; j<benefit_data_count[i]; j++)
      result_output += '<span>' + benefit_data[j].value + '</span>';
    result_output += '</td>';

    //disadvantage form
    result_output += '<td class="disadvantage_col">';
    var disadvantage_data = document.getElementsByClassName('disadvantage_input' + i);
    for (j=0; j<disadvantage_data_count[i]; j++)
      result_output += '<span>' + disadvantage_data[j].value + '</span>';
    result_output += '</td></tr>';
  }

  return result_output + '</table>';
}
