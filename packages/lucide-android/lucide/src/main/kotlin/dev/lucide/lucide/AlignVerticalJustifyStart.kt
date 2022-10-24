package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.AlignVerticalJustifyStart: ImageVector
    get() {
        if (_alignVerticalJustifyStart != null) {
            return _alignVerticalJustifyStart!!
        }
        _alignVerticalJustifyStart = Builder(name = "AlignVerticalJustifyStart", defaultWidth =
                24.0.dp, defaultHeight = 24.0.dp, viewportWidth = 24.0f, viewportHeight =
                24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(7.0f, 16.0f)
                lineTo(17.0f, 16.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 19.0f, 18.0f)
                lineTo(19.0f, 20.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 17.0f, 22.0f)
                lineTo(7.0f, 22.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 5.0f, 20.0f)
                lineTo(5.0f, 18.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 7.0f, 16.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(9.0f, 6.0f)
                lineTo(15.0f, 6.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 17.0f, 8.0f)
                lineTo(17.0f, 10.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 15.0f, 12.0f)
                lineTo(9.0f, 12.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 7.0f, 10.0f)
                lineTo(7.0f, 8.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 9.0f, 6.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(2.0f, 2.0f)
                horizontalLineToRelative(20.0f)
            }
        }
        .build()
        return _alignVerticalJustifyStart!!
    }

private var _alignVerticalJustifyStart: ImageVector? = null
