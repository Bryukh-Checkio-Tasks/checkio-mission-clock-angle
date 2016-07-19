


requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $, TableComponent) {
        function SVG(dom) {

            var colorOrange4 = "#F0801A";
            var colorOrange3 = "#FA8F00";
            var colorOrange2 = "#FAA600";
            var colorOrange1 = "#FABA00";

            var colorBlue4 = "#294270";
            var colorBlue3 = "#006CA9";
            var colorBlue2 = "#65A1CF";
            var colorBlue1 = "#8FC7ED";

            var colorGrey4 = "#737370";
            var colorGrey3 = "#9D9E9E";
            var colorGrey2 = "#C5C6C6";
            var colorGrey1 = "#EBEDED";

            var colorWhite = "#FFFFFF";

            var pad = 10;
            var paper;

            var R = 150;
            var inR = 130;

            var hLen = 70;
            var mLen = 100;

            var aText = {"font-family": "Roboto, Arial, sans", "stroke": colorBlue4, "font-size": 30};
            var aHour = {"stroke": colorBlue3, "stroke-width": 10, "arrow-end": "classic", "stroke-linecap": "round"};
            var aMinute = {"stroke": colorBlue3, "stroke-width": 6, "arrow-end": "classic", "stroke-linecap": "round"};
            var aClock = {"stroke": colorBlue4, "fill": colorBlue1, "stroke-width": 3};

            this.draw = function(data) {
                paper = Raphael(dom, (R + pad) * 2, (R + pad) * 2);

                var center = R + pad;

                paper.circle(center,  center, R).attr(aClock);
                paper.circle(center,  center, 1).attr(aClock);



                for (var i = 1; i <= 12; i++) {
                    var angle = (90 - 30 * i) * (Math.PI / 180);
                    var x = Math.cos(angle) * inR + center;
                    var y = -1 * Math.sin(angle) * inR + center;
                    paper.text(x, y, i).attr(aText);
                }

                var time = data.split(":");
                var hour = Number(time[0]);
                var minute = Number(time[1]);

                var hourHand = paper.path(Raphael.format("M{0},{0},V{1}", center, center - hLen)).attr(aHour);

                var minHand = paper.path(Raphael.format("M{0},{0},V{1}", center, center - mLen)).attr(aMinute);
                minHand.transform(["R", minute * 6, center, center]);
                hourHand.transform(["R", hour * 30 + minute / 2, center, center]);
            }

        }
        var io = new extIO({
            animation: function($expl, data){
                var checkioInput = data.in;
                if (!checkioInput){
                    return;
                }
                var svg = new SVG($expl[0]);
                svg.draw(checkioInput);
            },
            functions: {
                js: 'clockAngle',
                python: 'clock_angle'
            }
        });
        io.start();
    }
);
